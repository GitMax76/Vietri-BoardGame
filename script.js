// --- CONSTANTS ---
const COLORS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
const COLOR_NAMES = {
    'red': 'Rosso', 'blue': 'Blu', 'yellow': 'Giallo',
    'green': 'Verde', 'orange': 'Arancio', 'purple': 'Viola'
};

const COMMISSIONS = [
    { id: 'vaso_blu', name: "Vaso Marino", reqClay: 1, reqColors: { blue: 1 }, rewardMoney: 3, rewardPoints: 2 },
    { id: 'piatto_sole', name: "Piatto del Sole", reqClay: 1, reqColors: { yellow: 1 }, rewardMoney: 3, rewardPoints: 2 },
    { id: 'anfora_bosco', name: "Anfora del Bosco", reqClay: 2, reqColors: { green: 1, orange: 1 }, rewardMoney: 5, rewardPoints: 4 },
    { id: 'ciotola_fuoco', name: "Ciotola Fuoco", reqClay: 1, reqColors: { red: 2 }, rewardMoney: 4, rewardPoints: 2 },
    { id: 'mosaico_reale', name: "Mosaico Reale", reqClay: 3, reqColors: { blue: 2, yellow: 2 }, rewardMoney: 8, rewardPoints: 6 }
];

// --- STATE ---
const gameState = {
    coins: 5,
    clay: 0,
    pigments: { red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0 },

    assistants: 3,
    assistantsStatus: [false, false, false],
    selectedMeepleIndex: null,

    score: 0,
    currentObjective: COMMISSIONS[0],

    wheelUnlocked: false,
    rotationActions: 3,

    innerSlots: [{ clay: 0 }, { clay: 0 }, { clay: 0 }],
    innerRotationIndex: 0,

    outerSlots: Array(6).fill(null).map(() => ({ red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0 })),
    outerRotationIndex: 0,

    tutorialStep: 1,

    resetDaily() {
        this.assistantsStatus = [false, false, false];
        this.selectedMeepleIndex = null;
        this.wheelUnlocked = false;
        this.rotationActions = 3;
    }
};

// --- RENDERERS ---
function renderHome() {
    return `
    <div id="view-home" class="w-full max-w-4xl p-4 fade-in">
        <div class="maiolica-border rounded-xl">
            <div class="maiolica-content text-center space-y-6 p-4">
                <div class="mb-4">
                    <h1 class="text-5xl md:text-7xl font-bold uppercase tracking-widest text-blue-800 drop-shadow-sm">Vietri</h1>
                    <h2 class="text-2xl md:text-3xl text-yellow-600 font-serif italic mt-2">Maestri della Ceramica</h2>
                </div>
                <div class="max-w-2xl text-gray-700 leading-relaxed text-lg mx-auto">
                    <p class="italic mb-4">"Tra le pennellate di blu cobalto e lo splendore dei limoni..."</p>
                    <p class="mb-2">Diventa un <strong>Maestro Artigiano</strong>: raccogli argilla, compra pigmenti e crea capolavori al tornio.</p>
                </div>
                <div class="mt-8">
                    <button id="btn-start-game" class="btn-start rounded-full px-8 py-3">Prova a giocare</button>
                    <p class="text-xs text-gray-400 mt-4">Un gioco di M. Sabato & A. Solimene</p>
                </div>
            </div>
        </div>
    </div>`;
}

function renderGame() {
    return `
    <div id="view-game" class="w-full max-w-7xl p-2 md:p-6 fade-in h-screen flex flex-col">
        <div class="flex justify-between items-center mb-2 px-2 shrink-0 bg-white/80 p-2 rounded shadow-sm">
            <div><h1 class="text-xl md:text-2xl font-bold text-vietri-blue">Bottega del Maestro</h1></div>
            <button id="btn-exit" class="text-sm underline text-blue-600">Esci</button>
        </div>

        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 rounded shadow-sm mx-2 shrink-0">
            <p id="tutorial-text" class="text-gray-800 text-sm md:text-base font-medium">Caricamento...</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-hidden">
            
            <!-- LEFT -->
            <div class="lg:col-span-3 flex flex-col gap-2 overflow-y-auto">
                <div class="vietri-card p-4 text-center">
                    <h4 class="font-bold text-blue-800 mb-2">1. I tuoi Asinelli</h4>
                    <div id="donkey-container" class="flex justify-center gap-2 mb-4"></div>
                    
                    <div class="space-y-2 text-sm text-left px-2 border-t pt-2">
                        <div class="flex justify-between"><span>💰 Monete:</span> <span id="val-coins" class="font-bold"></span></div>
                        <div class="flex justify-between"><span>🧱 Argilla:</span> <span id="val-clay" class="font-bold"></span></div>
                        <div class="flex justify-between"><span>🏆 Punti:</span> <span id="val-score" class="font-bold"></span></div>
                        <div class="font-bold text-xs text-gray-500 mt-2 mb-1">COLORI:</div>
                        <div id="pigments-list" class="grid grid-cols-3 gap-1 text-xs"></div>
                    </div>
                </div>

                <div class="vietri-card p-4 bg-white border-yellow-400 text-center relative flex-grow">
                    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">COMMISSIONE</div>
                    <h4 class="font-bold text-blue-800 text-md mt-2 mb-1" id="obj-name">-</h4>
                    <div class="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-2 text-left space-y-1">
                        <div id="obj-req">Richiede: -</div>
                    </div>
                    <div class="text-xs text-green-600 font-bold" id="obj-reward">Premio: -</div>
                </div>
            </div>

            <!-- CENTER MAP -->
            <div class="lg:col-span-6 flex flex-col items-center justify-center relative">
                <div class="vietri-card p-6 w-full h-full flex flex-col items-center justify-center bg-blue-50/30 backdrop-blur-sm">
                    <h3 class="font-bold mb-4 text-center text-vietri-blue">2. Scegli le azioni</h3>
                    <div class="map-container relative rounded-full">
                        <!-- map-center renamed to avoid conflict or reused -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center font-bold text-blue-800 text-sm border border-blue-200 shadow-md bg-white z-20">VIETRI</div>
                        
                        <!-- Zone rendering -->
                        <div id="zone-river" class="map-zone pos-1 absolute cursor-pointer flex flex-col items-center justify-center">
                            <div class="text-2xl">🌊</div><div class="text-[0.6rem] font-bold">Fiume</div>
                            <div id="meeple-river" class="absolute -bottom-2 right-0"></div>
                        </div>
                        <div id="zone-market" class="map-zone pos-2 absolute cursor-pointer flex flex-col items-center justify-center">
                            <div class="text-2xl">🎨</div><div class="text-[0.6rem] font-bold">Mercato</div>
                            <div id="meeple-market" class="absolute -bottom-2 right-0"></div>
                        </div>
                        <div id="zone-plaza" class="map-zone pos-3 absolute cursor-pointer flex flex-col items-center justify-center">
                            <div class="text-2xl">📜</div><div class="text-[0.6rem] font-bold">Piazza</div>
                            <div id="meeple-plaza" class="absolute -bottom-2 right-0"></div>
                        </div>
                        <div id="zone-workshop" class="map-zone pos-4 absolute cursor-pointer flex flex-col items-center justify-center">
                            <div class="text-2xl">🏺</div><div class="text-[0.6rem] font-bold">Bottega</div>
                            <div id="meeple-workshop" class="absolute -bottom-2 right-0"></div>
                        </div>
                        <div id="zone-oven" class="map-zone pos-5 absolute cursor-pointer flex flex-col items-center justify-center">
                            <div class="text-2xl">🔥</div><div class="text-[0.6rem] font-bold">Forno</div>
                            <div id="meeple-oven" class="absolute -bottom-2 right-0"></div>
                        </div>
                    </div>
                    <button id="btn-end-round" class="mt-8 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black font-bold shadow-lg text-sm transition-transform hover:scale-105">
                        🌙 Fine Giornata (Reset)
                    </button>
                </div>
            </div>

            <!-- RIGHT LATHE -->
            <div class="lg:col-span-3 flex flex-col gap-2">
                <div class="vietri-card p-4 text-center h-full flex flex-col">
                    <h4 class="font-bold mb-1 text-vietri-blue">3. Tornio di Precisione</h4>
                    
                    <div class="flex justify-between items-center text-xs px-4 mb-2">
                        <span class="font-bold text-gray-600">Mosse Rimaste:</span>
                        <span id="rotations-left" class="font-bold text-lg text-blue-600">3/3</span>
                    </div>

                    <div id="lathe-ui-container" class="opacity-50 pointer-events-none transition-opacity duration-300 flex-grow flex flex-col items-center relative overflow-hidden">
                        
                        <div class="relative w-[240px] h-[240px] my-4">
                            <!-- Indicator -->
                            <div class="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl text-red-600 animate-bounce z-30 drop-shadow-md">▼</div>
                            
                            <!-- Outer Wheel -->
                            <div id="disk-outer" class="absolute top-0 left-0 w-full h-full wheel-outer-bg border-4 border-blue-800 shadow-xl transition-transform duration-500 ease-out"></div>

                            <!-- Inner Wheel -->
                            <div id="disk-inner" class="absolute top-[20%] left-[20%] w-[60%] h-[60%] wheel-inner-bg border-4 border-yellow-500 shadow-xl transition-transform duration-500 ease-out flex items-center justify-center"></div>
                            
                            <!-- Center Cap -->
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-blue-900 rounded-full border-2 border-white flex items-center justify-center z-20 shadow-md">
                                <div class="text-[0.5rem] text-white font-bold opacity-80">VIETRI</div>
                            </div>
                        </div>

                        <div class="w-full space-y-3 mt-auto">
                           <!-- Controls -->
                           <div class="grid grid-cols-2 gap-4 text-xs">
                                <div class="flex flex-col items-center bg-yellow-50 p-2 rounded border border-yellow-200">
                                    <span class="font-bold mb-1 text-yellow-800">Ruota Interna</span>
                                    <div class="flex gap-2">
                                        <button class="btn-rotate bg-yellow-600 text-white w-8 h-8 rounded-full shadow hover:bg-yellow-700" data-target="inner" data-dir="-1">↺</button>
                                        <button class="btn-rotate bg-yellow-600 text-white w-8 h-8 rounded-full shadow hover:bg-yellow-700" data-target="inner" data-dir="1">↻</button>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center bg-blue-50 p-2 rounded border border-blue-200">
                                    <span class="font-bold mb-1 text-blue-800">Ruota Esterna</span>
                                    <div class="flex gap-2">
                                        <button class="btn-rotate bg-blue-600 text-white w-8 h-8 rounded-full shadow hover:bg-blue-700" data-target="outer" data-dir="-1">↺</button>
                                        <button class="btn-rotate bg-blue-600 text-white w-8 h-8 rounded-full shadow hover:bg-blue-700" data-target="outer" data-dir="1">↻</button>
                                    </div>
                                </div>
                           </div>
                        </div>
                    </div>
                    <div id="lathe-lock-msg" class="text-red-500 font-bold text-sm mt-4">🔒 Vai in Bottega per usare</div>
                </div>
            </div>
        </div>
    </div>

    <!-- MODAL -->
    <div id="slot-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full border-4 border-vietri-blue">
            <h3 class="text-xl font-bold text-vietri-blue mb-4" id="slot-modal-title">Gestisci Slot</h3>
            <div id="slot-modal-content" class="space-y-4"></div>
            <div class="mt-6 flex justify-end gap-2">
                <button id="btn-close-modal" class="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">Chiudi</button>
            </div>
        </div>
    </div>`;
}

// --- CORE LOGIC ---
const app = document.querySelector('#app');

function init() {
    app.innerHTML = renderHome();
    const btn = document.getElementById('btn-start-game');
    if (btn) btn.addEventListener('click', () => {
        app.innerHTML = renderGame();
        startGameLoop();
    });
}

function startGameLoop() {
    updateUI();

    document.getElementById('btn-exit').addEventListener('click', () => init());
    document.getElementById('btn-end-round').addEventListener('click', endRound);

    ['river', 'market', 'plaza', 'workshop', 'oven'].forEach(z => {
        document.getElementById(`zone-${z}`).addEventListener('click', () => handleZoneClick(z));
    });

    document.querySelectorAll('.btn-rotate').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target.dataset.target;
            const dir = parseInt(e.target.dataset.dir);
            rotateWheel(target, dir);
        });
    });

    document.getElementById('btn-close-modal').addEventListener('click', () => {
        document.getElementById('slot-modal').classList.add('hidden');
        renderLathe();
    });
}

function updateUI() {
    const elCoins = document.getElementById('val-coins');
    if (!elCoins) return;

    elCoins.textContent = gameState.coins;
    document.getElementById('val-clay').textContent = gameState.clay;
    document.getElementById('val-score').textContent = gameState.score;
    document.getElementById('rotations-left').textContent = `${gameState.rotationActions}/3`;

    const pList = document.getElementById('pigments-list');
    pList.innerHTML = '';
    COLORS.forEach(c => {
        const count = gameState.pigments[c];
        if (count > 0 || true) {
            const el = document.createElement('div');
            el.className = 'flex items-center gap-1';
            el.innerHTML = `<span class="w-3 h-3 rounded-full border border-gray-300" style="background:${c}"></span> ${count}`;
            el.style.opacity = count === 0 ? '0.3' : '1';
            pList.appendChild(el);
        }
    });

    const obj = gameState.currentObjective;
    if (obj) {
        document.getElementById('obj-name').textContent = obj.name;
        let reqText = `<b>${obj.reqClay} Argilla</b>`;
        const colKeys = Object.keys(obj.reqColors);
        if (colKeys.length > 0) {
            reqText += `, <br>Colori: `;
            reqText += colKeys.map(k => `<span style="color:${k === 'yellow' ? '#d4af37' : k}" class="font-bold">${obj.reqColors[k]} ${COLOR_NAMES[k]}</span>`).join(', ');
        }
        document.getElementById('obj-req').innerHTML = reqText;
        document.getElementById('obj-reward').textContent = `Premio: ${obj.rewardMoney} Monete, ${obj.rewardPoints} Punti`;
    }

    const dCont = document.getElementById('donkey-container');
    dCont.innerHTML = '';
    for (let i = 0; i < gameState.assistants; i++) {
        const btn = document.createElement('button');
        btn.className = `donkey-btn ${gameState.assistantsStatus[i] ? 'used' : ''} ${gameState.selectedMeepleIndex === i ? 'selected' : ''}`;
        btn.textContent = '🫏';
        btn.onclick = () => {
            if (!gameState.assistantsStatus[i]) {
                gameState.selectedMeepleIndex = i;
                updateUI();
            }
        };
        dCont.appendChild(btn);
    }

    const lCont = document.getElementById('lathe-ui-container');
    const lMsg = document.getElementById('lathe-lock-msg');
    if (gameState.wheelUnlocked) {
        lCont.classList.remove('opacity-50', 'pointer-events-none');
        lMsg.classList.add('hidden');
    } else {
        lCont.classList.add('opacity-50', 'pointer-events-none');
        lMsg.classList.remove('hidden');
    }

    updateTutorial();
    renderLathe();
}

function updateTutorial() {
    const t = document.getElementById('tutorial-text');
    const s = gameState.tutorialStep;
    if (s === 1) t.innerHTML = "Seleziona un asinello e visita il <b>Fiume</b> per l'argilla.";
    else if (s === 2) t.innerHTML = "Visita il <b>Mercato</b> per comprare i colori (costa 1 moneta).";
    else if (s === 3) t.innerHTML = "Vai alla <b>Bottega</b> per sbloccare il Tornio.";
    else if (s === 4) t.innerHTML = "Clicca sugli SPICCHI del tornio per inserire materiali, poi ruota (max 3 mosse).";
    else if (s === 5) t.innerHTML = "Quando allineato (▼), vai al <b>Forno</b> per completare l'opera.";
}

function renderLathe() {
    const outer = document.getElementById('disk-outer');
    const inner = document.getElementById('disk-inner');
    if (!outer || !inner) return;

    outer.innerHTML = '';
    inner.innerHTML = '';

    const outerRot = gameState.outerRotationIndex * 60;
    const innerRot = gameState.innerRotationIndex * 120;

    outer.style.transform = `rotate(${outerRot}deg)`;
    inner.style.transform = `rotate(${innerRot}deg)`;

    for (let i = 0; i < 6; i++) {
        const slotData = gameState.outerSlots[i];
        const angle = i * 60;
        const rad = (angle - 90) * (Math.PI / 180);

        const r = 38;
        const left = 50 + r * Math.cos(rad);
        const top = 50 + r * Math.sin(rad);

        const el = document.createElement('div');
        el.className = 'slot-marker cursor-pointer hover:scale-110 transition-transform';
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;
        el.style.transform = `translate(-50%, -50%) rotate(${-outerRot}deg)`;

        let dots = '';
        let count = 0;
        for (let [c, qty] of Object.entries(slotData)) {
            for (let k = 0; k < qty; k++) {
                dots += `<div class="w-3 h-3 rounded-full border border-black/20 shadow-sm" style="background:${c}"></div>`;
                count++;
            }
        }

        if (count === 0) {
            el.innerHTML = '<span class="text-gray-300 text-lg opacity-50">+</span>';
        } else {
            el.innerHTML = `<div class="flex flex-wrap justify-center gap-1 w-10">${dots}</div>`;
        }

        el.onclick = (e) => { e.stopPropagation(); openSlotManager('outer', i); };
        outer.appendChild(el);
    }

    for (let i = 0; i < 3; i++) {
        const slotData = gameState.innerSlots[i];
        const angle = i * 120;
        const rad = (angle - 90) * (Math.PI / 180);
        const r = 30;
        const left = 50 + r * Math.cos(rad);
        const top = 50 + r * Math.sin(rad);

        const el = document.createElement('div');
        el.className = 'slot-marker cursor-pointer hover:scale-110 transition-transform';
        el.style.left = `${left}%`;
        el.style.top = `${top}%`;
        el.style.transform = `translate(-50%, -50%) rotate(${-innerRot}deg)`;

        let dots = '';
        if (slotData.clay > 0) {
            for (let k = 0; k < slotData.clay; k++) {
                dots += `<div class="w-4 h-3 bg-stone-400 border border-stone-600 rounded-sm shadow-sm"></div>`;
            }
            el.innerHTML = `<div class="flex flex-col justify-center gap-0.5">${dots}</div>`;
        } else {
            el.innerHTML = '<span class="text-gray-400 text-lg opacity-50">+</span>';
        }

        el.onclick = (e) => { e.stopPropagation(); openSlotManager('inner', i); };
        inner.appendChild(el);
    }
}

function openSlotManager(wheel, index) {
    if (!gameState.wheelUnlocked) return;
    const modal = document.getElementById('slot-modal');
    const content = document.getElementById('slot-modal-content');
    const title = document.getElementById('slot-modal-title');

    modal.classList.remove('hidden');
    title.textContent = wheel === 'inner' ? `Slot Interno ${index + 1}` : `Slot Esterno ${index + 1}`;

    if (wheel === 'inner') {
        const slot = gameState.innerSlots[index];
        renderClayManager(content, slot);
    } else {
        const slot = gameState.outerSlots[index];
        renderColorManager(content, slot);
    }
}

function renderClayManager(container, slot) {
    container.innerHTML = `
        <div class="flex justify-between items-center bg-gray-50 p-3 rounded">
            <span>Nel Slot: <b>${slot.clay}</b></span>
            <div class="flex gap-2">
                 <button id="btn-add-clay" class="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600 font-bold">+</button>
                 <button id="btn-rem-clay" class="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600 font-bold">-</button>
            </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Disponibile nel sacco: ${gameState.clay} Argilla</p>
        <div class="mt-4 flex justify-center">
            <div class="w-16 h-16 border-2 border-gray-400 bg-gray-100 rounded flex items-center justify-center">
                 <span class="text-2xl text-stone-500">${slot.clay > 0 ? '⬜'.repeat(slot.clay) : '∅'}</span>
            </div>
        </div>
    `;

    container.querySelector('#btn-add-clay').onclick = () => {
        if (gameState.clay > 0) {
            gameState.clay--;
            slot.clay++;
            updateUI();
            renderClayManager(container, slot);
        }
    };
    container.querySelector('#btn-rem-clay').onclick = () => {
        if (slot.clay > 0) {
            gameState.clay++;
            slot.clay--;
            updateUI();
            renderClayManager(container, slot);
        }
    };
}

function renderColorManager(container, slot) {
    const presentColors = Object.keys(slot).filter(k => slot[k] > 0);
    const distinct = presentColors.length;

    const visibleColors = COLORS.filter(c => slot[c] > 0 || gameState.pigments[c] > 0);

    if (visibleColors.length === 0) {
        container.innerHTML = `<p class="text-center text-gray-500 italic py-4">Nessun colore disponibile.<br>Visita il Mercato!</p>`;
        return;
    }

    let html = `<div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">`;
    visibleColors.forEach(c => {
        const qtyInSlot = slot[c];
        const qtyInInv = gameState.pigments[c];
        const canAdd = qtyInInv > 0 && (distinct < 2 || qtyInSlot > 0);

        html += `
        <div class="flex flex-col items-center bg-gray-50 p-2 rounded border border-gray-200">
            <span class="w-6 h-6 rounded-full mb-1 border shadow-sm" style="background:${c}"></span>
            <span class="text-xs font-bold text-gray-700">${COLOR_NAMES[c]}</span>
            <div class="flex items-center gap-2 mt-2">
                <button class="btn-color-mod bg-red-100 text-red-600 w-6 h-6 rounded-full hover:bg-red-200 font-bold" data-col="${c}" data-op="-">-</button>
                <span class="font-bold text-lg w-4 text-center">${qtyInSlot}</span>
                <button class="btn-color-mod bg-green-100 text-green-600 w-6 h-6 rounded-full hover:bg-green-200 font-bold ${!canAdd ? 'opacity-50 cursor-not-allowed' : ''}" data-col="${c}" data-op="+">+</button>
            </div>
            <span class="text-[0.6rem] text-gray-400 mt-1">In borsa: ${qtyInInv}</span>
        </div>`;
    });
    html += `</div><p class="text-[0.6rem] text-gray-500 mt-2 text-center">Max 2 tipi di colore per slot.</p>`;

    container.innerHTML = html;

    container.querySelectorAll('.btn-color-mod').forEach(btn => {
        btn.onclick = (e) => {
            const col = e.target.dataset.col;
            const op = e.target.dataset.op;
            if (op === '+') {
                const currentDistinct = Object.values(slot).filter(v => v > 0).length;
                const isNewColor = slot[col] === 0;
                if (gameState.pigments[col] > 0) {
                    if (isNewColor && currentDistinct >= 2) return;
                    gameState.pigments[col]--;
                    slot[col]++;
                }
            } else {
                if (slot[col] > 0) {
                    slot[col]--;
                    gameState.pigments[col]++;
                }
            }
            updateUI();
            renderColorManager(container, slot);
        };
    });
}

function openMarketMenu() {
    if (gameState.selectedMeepleIndex === null) {
        alert("Seleziona un asinello prima!");
        return;
    }

    const modal = document.getElementById('slot-modal');
    const content = document.getElementById('slot-modal-content');
    const title = document.getElementById('slot-modal-title');

    modal.classList.remove('hidden');
    title.textContent = "Mercato dei Colori";
    renderMarketMenu(content);
}

function renderMarketMenu(container) {
    container.innerHTML = `
        <div class="space-y-4">
            <!-- BUY SECTION -->
            <div class="bg-blue-50 p-3 rounded border border-blue-200">
                <h4 class="font-bold text-blue-800 mb-2">Acquista</h4>
                <p class="text-sm mb-2">1 Moneta = 2 Colori a caso</p>
                <button id="btn-market-buy" class="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 ${gameState.coins < 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                    Acquista (💰 1)
                </button>
            </div>

            <div class="flex items-center justify-center text-gray-400 text-sm font-bold">- OPPURE -</div>

            <!-- TRADE SECTION -->
            <div class="bg-yellow-50 p-3 rounded border border-yellow-200">
                <h4 class="font-bold text-yellow-800 mb-2">Baratta</h4>
                <p class="text-xs text-gray-600 mb-2">Scambia 2 colori qualsiasi per 1 a scelta.</p>
                
                <div class="mb-3">
                    <span class="text-xs font-bold block mb-1">Dai 2 colori:</span>
                    <div id="trade-give-container" class="grid grid-cols-6 gap-1"></div>
                </div>

                <div class="mb-3">
                    <span class="text-xs font-bold block mb-1">Ricevi 1 colore:</span>
                    <div id="trade-get-container" class="grid grid-cols-6 gap-1"></div>
                </div>

                <button id="btn-market-trade" class="w-full bg-yellow-600 text-white py-2 rounded font-bold hover:bg-yellow-700 opacity-50 cursor-not-allowed">
                    Scambia (2 -> 1)
                </button>
            </div>
        </div>
    `;

    // BUY LOGIC
    const btnBuy = container.querySelector('#btn-market-buy');
    btnBuy.onclick = () => {
        if (gameState.coins >= 1) {
            gameState.coins--;
            for (let i = 0; i < 2; i++) {
                const c = COLORS[Math.floor(Math.random() * COLORS.length)];
                gameState.pigments[c]++;
            }
            finalizeMarketAction("buy");
        }
    };

    // TRADE LOGIC
    let selectedGive = [];
    let selectedGet = null;

    const updateTradeUI = () => {
        const giveCont = container.querySelector('#trade-give-container');
        giveCont.innerHTML = '';
        COLORS.forEach(c => {
            const myQty = gameState.pigments[c];
            const selectedQty = selectedGive.filter(x => x === c).length;
            const available = myQty - selectedQty;

            const btn = document.createElement('button');
            btn.className = `w-6 h-6 rounded-full border shadow-sm ${available > 0 ? 'opacity-100 hover:scale-110' : 'opacity-20 cursor-not-allowed'}`;
            btn.style.backgroundColor = c;
            btn.onclick = () => {
                if (available > 0 && selectedGive.length < 2) {
                    selectedGive.push(c);
                    updateTradeUI();
                }
            };
            giveCont.appendChild(btn);
        });

        const offerDisplay = document.createElement('div');
        offerDisplay.className = "col-span-6 flex gap-1 mt-1 min-h-[1.5rem] bg-white p-1 rounded border border-gray-200 justify-center";
        selectedGive.forEach((c, idx) => {
            const ball = document.createElement('div');
            ball.className = "w-4 h-4 rounded-full cursor-pointer hover:opacity-50";
            ball.style.backgroundColor = c;
            ball.onclick = () => {
                selectedGive.splice(idx, 1);
                updateTradeUI();
            };
            offerDisplay.appendChild(ball);
        });
        giveCont.appendChild(offerDisplay);

        const getCont = container.querySelector('#trade-get-container');
        getCont.innerHTML = '';
        COLORS.forEach(c => {
            const btn = document.createElement('button');
            btn.className = `w-6 h-6 rounded-full border shadow-sm transition-transform ${selectedGet === c ? 'ring-2 ring-black scale-110' : 'opacity-70 hover:opacity-100'}`;
            btn.style.backgroundColor = c;
            btn.onclick = () => {
                selectedGet = c;
                updateTradeUI();
            };
            getCont.appendChild(btn);
        });

        const btnTrade = container.querySelector('#btn-market-trade');
        if (selectedGive.length === 2 && selectedGet) {
            btnTrade.classList.remove('opacity-50', 'cursor-not-allowed');
            btnTrade.onclick = () => {
                selectedGive.forEach(c => gameState.pigments[c]--);
                gameState.pigments[selectedGet]++;
                finalizeMarketAction("trade");
            };
        } else {
            btnTrade.classList.add('opacity-50', 'cursor-not-allowed');
            btnTrade.onclick = null;
        }
    };

    updateTradeUI();
}

function finalizeMarketAction(type) {
    const z = 'market';
    const modal = document.getElementById('slot-modal');
    modal.classList.add('hidden');

    gameState.assistantsStatus[gameState.selectedMeepleIndex] = true;
    const m = document.createElement('div');
    m.textContent = '🫏';
    m.className = 'absolute text-xl animate-bounce';
    document.getElementById(`meeple-${z}`).appendChild(m);
    gameState.selectedMeepleIndex = null;

    if (gameState.tutorialStep === 2) gameState.tutorialStep++;

    updateUI();
    alert(type === "buy" ? "Acquisto effettuato!" : "Scambio completato!");
}

function rotateWheel(target, dir) {
    if (gameState.rotationActions <= 0) {
        alert("Hai finito le mosse per oggi! (3/3)");
        return;
    }
    gameState.rotationActions--;
    if (target === 'inner') gameState.innerRotationIndex += dir;
    else gameState.outerRotationIndex += dir;
    updateUI();
}

function handleZoneClick(zone) {
    if (gameState.selectedMeepleIndex === null) {
        alert("Seleziona un asinello prima!");
        return;
    }
    let success = false;

    if (zone === 'river') {
        gameState.clay += 2;
        success = true;
        if (gameState.tutorialStep === 1) gameState.tutorialStep++;
    }
    else if (zone === 'market') {
        openMarketMenu();
    }
    else if (zone === 'plaza') {
        const current = gameState.currentObjective;
        if (confirm(`Sei in Piazza! Vuoi cambiare la commissione attuale ("${current.name}") con una nuova?`)) {
            let newComm;
            do {
                newComm = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
            } while (newComm.id === current.id && COMMISSIONS.length > 1);

            gameState.currentObjective = newComm;
            alert(`Nuova commissione ricevuta: "${newComm.name}"!`);
            success = true;
        } else {
            return;
        }
        success = true;
    }
    else if (zone === 'workshop') {
        gameState.wheelUnlocked = true;
        success = true;
        if (gameState.tutorialStep === 3) gameState.tutorialStep++;
    }
    else if (zone === 'oven') {
        const outMod = ((-gameState.outerRotationIndex % 6) + 6) % 6;
        const inMod = ((-gameState.innerRotationIndex % 3) + 3) % 3;
        const topOuter = gameState.outerSlots[outMod];
        const topInner = gameState.innerSlots[inMod];
        const comm = gameState.currentObjective;

        const hasClay = topInner.clay >= comm.reqClay;
        let hasColors = true;
        for (let [c, amt] of Object.entries(comm.reqColors)) {
            if (topOuter[c] < amt) hasColors = false;
        }

        if (hasClay && hasColors) {
            alert(`MAGNIFICO! Hai creato "${comm.name}"!`);
            gameState.coins += comm.rewardMoney;
            gameState.score += comm.rewardPoints;
            topInner.clay -= comm.reqClay;
            for (let [c, amt] of Object.entries(comm.reqColors)) topOuter[c] -= amt;
            gameState.currentObjective = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
            success = true;
            if (gameState.tutorialStep === 5) gameState.tutorialStep++;
        } else {
            alert(`MAMMA MIA! L'opera non è pronta.\n"${comm.name}" vuole:\n- ${comm.reqClay} Argilla\n- Colori specifici\n\nControlla lo spicchio sotto la freccia ▼!`);
            success = true;
        }
    }

    if (success) {
        gameState.assistantsStatus[gameState.selectedMeepleIndex] = true;
        const m = document.createElement('div');
        m.textContent = '🫏';
        m.className = 'absolute text-xl animate-bounce';
        document.getElementById(`meeple-${zone}`).appendChild(m);
        gameState.selectedMeepleIndex = null;
        updateUI();
    }
}

function endRound() {
    gameState.resetDaily();
    ['river', 'market', 'plaza', 'workshop', 'oven'].forEach(z => {
        document.getElementById(`meeple-${z}`).innerHTML = '';
    });
    alert("Un nuovo giorno sorge su Vietri! (Mosse tornio ripristinate)");
    updateUI();
}

init();
