// test_game.js
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const scriptContent = fs.readFileSync('./vietri-repo/script.js', 'utf8');

// Mock HTML environment
const dom = new JSDOM(`<!DOCTYPE html>
<html>
<body>
    <div id="app"></div>
    <div id="view-game">
        <div id="val-coins"></div><div id="val-clay"></div><div id="val-score"></div><div id="rotations-left"></div>
        <div id="pigments-list"></div><div id="donkey-container"></div>
        <div id="lathe-ui-container"></div><div id="lathe-lock-msg"></div>
        
        <div id="zone-river"></div>
        <div id="meeple-river"></div>
        <div id="zone-market"></div>
        <div id="meeple-market"></div>
        <!-- other zones if needed -->
    </div>
</body>
</html>`);

global.window = dom.window;
global.document = dom.window.document;
global.alert = (msg) => console.log(`[ALERT] ${msg}`);
global.confirm = (msg) => { console.log(`[CONFIRM] ${msg}`); return true; };

// Evaluate script.js in this context
// We need to extract the content or just eval it
// script.js declares consts/funcs in global scope if not module
eval(scriptContent);

console.log('--- TEST START ---');

// 1. Init Game State
init();
// Simulate Start Game
app.innerHTML = renderGame();
// Call startGameLoop part
updateUI();

console.log('--- STATE BEFORE ACTION ---');
console.log('Coins:', gameState.coins);
console.log('Assistants:', gameState.assistantsStatus);

// 2. Select Donkey (Index 0)
console.log('--- SELECT DONKEY 0 ---');
gameState.selectedMeepleIndex = 0;

// 3. Click River
console.log('--- CLICK RIVER ---');
try {
    handleZoneClick('river');
    console.log('Success (no crash)');
} catch (e) {
    console.error('CRASH in handleZoneClick:', e);
}

// 4. Verify River Action
console.log('Clay:', gameState.clay); // Should be +2 -> 2
console.log('Assistant 0 used:', gameState.assistantsStatus[0]);
console.log('Meeple placed in UI:', document.getElementById('meeple-river').innerHTML !== '');

// 5. Select Donkey 1
gameState.selectedMeepleIndex = 1;

// 6. Click Market
console.log('--- CLICK MARKET ---');
try {
    handleZoneClick('market');
    console.log('Market menu opened? Need to verify openMarketMenu function existence/logic');
    // If openMarketMenu is undefined in test context because it's not in the snippet I viewed?
    // Wait, I viewed the whole file. It should be there. 
    // Wait, I only viewedlines 1-800 in previous step. 
    // Let's check if openMarketMenu was in lines 800+ (it likely is, handleZoneClick calls it).
} catch (e) {
    console.error('CRASH in Market:', e);
}

console.log('--- TEST END ---');
