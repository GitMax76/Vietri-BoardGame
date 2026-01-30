import './style.css';
import { gameState } from './game/state.js';
import { COMMISSIONS, COLORS, COLOR_NAMES } from './game/constants.js';

// --- HTML COMPONENT GENERATORS ---

function renderHome() {
  return `
    <div id="view-home" class="w-full max-w-4xl p-4 fade-in">
        <div class="maiolica-border rounded-xl">
            <div class="maiolica-content text-center space-y-6">
                <div class="mb-4">
                    <h1 class="text-5xl md:text-7xl font-bold uppercase tracking-widest text-blue-800 drop-shadow-sm">Vietri</h1>
                    <h2 class="text-2xl md:text-3xl text-yellow-600 font-serif italic mt-2">Maestri della Ceramica</h2>
                </div>
                <div class="max-w-2xl text-gray-700 leading-relaxed text-lg mx-auto">
                    <p class="italic mb-4">"Tra le pennellate di blu cobalto e lo splendore dei limoni..."</p>
                    <p class="mb-2">Diventa un <strong>Maestro Artigiano</strong>: raccogli argilla, compra pigmenti e crea capolavori al tornio.</p>
                </div>
                <div class="mt-8">
                    <button id="btn-start-game" class="btn-start rounded-full">Prova a giocare</button>
                    <p class="text-xs text-gray-400 mt-4">Un gioco di M. Sabato & A. Solimene</p>
                </div>
            </div>
        </div>
    </div>`;
}

function renderGame() {
  return `
    <div id="view-game" class="w-full max-w-7xl p-2 md:p-6 hidden fade-in h-screen flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center mb-2 px-2 shrink-0">
            <div><h1 class="text-xl md:text-2xl font-bold text-vietri-blue">Bottega del Maestro</h1></div>
            <button id="btn-exit" class="text-sm underline text-blue-600">Esci</button>
        </div>

        <!-- Guide -->
        <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 rounded shadow-sm mx-2 shrink-0">
            <p id="tutorial-text" class="text-gray-800 text-sm md:text-base font-medium">Caricamento...</p>
        </div>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-hidden">
            
            <!-- LEFT: Resource & Objective -->
            <div class="lg:col-span-3 flex flex-col gap-2 overflow-y-auto">
                <!-- Resources -->
                <div class="vietri-card p-4 text-center">
                    <h4 class="font-bold text-blue-800 mb-2">1. I tuoi Asinelli</h4>
                    <div id="donkey-container" class="flex justify-center gap-2 mb-4"></div>
                    
                    <div class="space-y-2 text-sm text-left px-2 border-t pt-2">
                        <div class="flex justify-between"><span>💰 Monete:</span> <span id="val-coins" class="font-bold"></span></div>
                        <div class="flex justify-between"><span>🧱 Argilla:</span> <span id="val-clay" class="font-bold"></span></div>
                        <div class="flex justify-between"><span>🏆 Punti:</span> <span id="val-score" class="font-bold"></span></div>
                        
                        <div class="font-bold text-xs text-gray-500 mt-2 mb-1">VERNICI:</div>
                        <div id="pigments-list" class="grid grid-cols-3 gap-1 text-xs"></div>
                    </div>
                </div>

                <!-- Objective -->
                <div class="vietri-card p-4 bg-white border-yellow-400 text-center relative flex-grow">
                    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">COMMISSIONE</div>
                    <h4 class="font-bold text-blue-800 text-md mt-2 mb-1" id="obj-name">-</h4>
                    <div class="text-sm text-gray-700 bg-gray-50 p-2 rounded mb-2 text-left space-y-1">
                        <div id="obj-req">Richiede: -</div>
                    </div>
                    <div class="text-xs text-green-600 font-bold" id="obj-reward">Premio: -</div>
                </div>
            </div>

            <!-- CENTER: Map -->
            <div class="lg:col-span-6 flex flex-col items-center justify-center relative">
                <div class="vietri-card p-6 w-full h-full flex flex-col items-center justify-center bg-blue-50/30">
                    <h3 class="font-bold mb-4 text-center text-vietri-blue">2. Scegli le azioni</h3>
                    
                    <div class="map-container relative rounded-full">
                        <div class="map-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center font-bold text-blue-800 text-sm">VIETRI</div>
                        
                        <!-- Zones -->
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

            <!-- RIGHT: Lathe (Complex) -->
            <div class="lg:col-span-3 flex flex-col gap-2">
                <div class="vietri-card p-4 text-center h-full flex flex-col">
                    <h4 class="font-bold mb-1 text-vietri-blue">3. Tornio di Precisione</h4>
                    <div id="lathe-ui-container" class="opacity-50 pointer-events-none transition-opacity duration-300 flex-grow flex flex-col items-center">
                        
                        <div class="relative w-[200px] h-[200px] my-4">
                            <div class="absolute -top-6 left-1/2 -translate-x-1/2 text-2xl text-vietri-blue animate-bounce">▼</div>
                            
                            <!-- Outer Wheel -->
                            <div id="disk-outer" class="absolute top-0 left-0 w-full h-full rounded-full border-4 border-dashed border-blue-300 bg-white shadow-lg transition-transform duration-500 ease-out">
                                <!-- Slots rendered by JS -->
                            </div>

                            <!-- Inner Wheel -->
                            <div id="disk-inner" class="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full border-4 border-yellow-400 bg-yellow-50 shadow-inner transition-transform duration-500 ease-out flex items-center justify-center">
                                <!-- Slots rendered by JS -->
                                <div class="z-10 text-xs text-gray-400 font-bold">TORNIO</div>
                            </div>
                        </div>

                        <!-- Controls -->
                        <div class="w-full space-y-3 mt-auto">
                           <div class="grid grid-cols-2 gap-2 text-xs">
                                <div class="flex flex-col items-center">
                                    <span class="font-bold mb-1">Interno (Argilla)</span>
                                    <div class="flex gap-1">
                                        <button class="btn-rotate bg-gray-700 text-white px-2 rounded" data-target="inner" data-dir="-1">↺</button>
                                        <button class="btn-rotate bg-gray-700 text-white px-2 rounded" data-target="inner" data-dir="1">↻</button>
                                    </div>
                                </div>
                                <div class="flex flex-col items-center">
                                    <span class="font-bold mb-1">Esterno (Colori)</span>
                                    <div class="flex gap-1">
                                        <button class="btn-rotate bg-blue-700 text-white px-2 rounded" data-target="outer" data-dir="-1">↺</button>
                                        <button class="btn-rotate bg-blue-700 text-white px-2 rounded" data-target="outer" data-dir="1">↻</button>
                                    </div>
                                </div>
                           </div>
                           <p class="text-[0.6rem] text-gray-500">Ruotare costa 1 Moneta</p>
                        </div>

                        <!-- Current Slot Info (Top) -->
                        <div class="mt-4 p-2 bg-gray-100 rounded text-xs text-left w-full">
                            <div class="font-bold border-b pb-1 mb-1">Allineamento Attuale (▼):</div>
                            <div id="status-inner" class="mb-1">Int: Vuoto</div>
                            <div id="status-outer">Est: Vuoto</div>
                        </div>

                    </div>
                    <div id="lathe-lock-msg" class="text-red-500 font-bold text-sm mt-4">🔒 Vai in Bottega per usare</div>
                </div>
            </div>

        </div>
    </div>
    
    <!-- Modal for Slot Management -->
    <div id="slot-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full border-4 border-vietri-blue">
            <h3 class="text-xl font-bold text-vietri-blue mb-4" id="slot-modal-title">Gestisci Slot</h3>
            
            <div id="slot-modal-content" class="space-y-4">
                <!-- Dynamic Content -->
            </div>

            <div class="mt-6 flex justify-end gap-2">
                <button id="btn-close-modal" class="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">Chiudi</button>
            </div>
        </div>
    </div>
    `;
}

// --- LOGIC & HELPERS ---
const app = document.querySelector('#app');

function init() {
  app.innerHTML = renderHome();
  document.getElementById('btn-start-game').addEventListener('click', () => {
    app.innerHTML = renderGame();
    startGameLoop();
  });
}

function startGameLoop() {
  updateUI();

  // Bind Global Events
  document.getElementById('btn-exit').addEventListener('click', () => init());
  document.getElementById('btn-end-round').addEventListener('click', endRound);

  // Bind Zone Clicks
  ['river', 'market', 'plaza', 'workshop', 'oven'].forEach(z => {
    document.getElementById(`zone-${z}`).addEventListener('click', () => handleZoneClick(z));
  });

  // Bind Rotation
  document.querySelectorAll('.btn-rotate').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target.dataset.target; // inner or outer
      const dir = parseInt(e.target.dataset.dir);
      rotateWheel(target, dir);
    });
  });

  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('slot-modal').classList.add('hidden');
    renderLathe(); // Refresh visuals
  });
}

function updateUI() {
  // Values
  document.getElementById('val-coins').textContent = gameState.coins;
  document.getElementById('val-clay').textContent = gameState.clay;
  document.getElementById('val-score').textContent = gameState.score;

  // Pigments
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

  // Objective
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

  // Meeples
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

  // Lathe Unlock
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
  // Simple tutorial text logic
  const s = gameState.tutorialStep;
  if (s === 1) t.innerHTML = "Seleziona un asinello e visita il <b>Fiume</b> per l'argilla.";
  else if (s === 2) t.innerHTML = "Visita il <b>Mercato</b> per comprare i colori (costa 1 moneta).";
  else if (s === 3) t.innerHTML = "Vai alla <b>Bottega</b> per sbloccare il Tornio.";
  else if (s === 4) t.innerHTML = "Clicca sugli slot del tornio per riempirli, poi ruota per allineare.";
  else if (s === 5) t.innerHTML = "Quando allineato (▼), vai al <b>Forno</b> per completare l'opera.";
}

// --- LATHE LOGIC ---

function renderLathe() {
  const outer = document.getElementById('disk-outer');
  const inner = document.getElementById('disk-inner');
  if (!outer || !inner) return;

  // Clear
  outer.innerHTML = '';
  inner.innerHTML = '<div class="z-10 text-[0.5rem] text-gray-400 font-bold select-none">TORNIO</div>';

  // Constants for positioning
  // 6 Slots Outer -> 60 deg each. Start at -90 (Top)? No, usually 0 is East. Tailwind rotate is clickable? 
  // We will use absolute positioning + transform on children, then rotate the PARENT container.
  // Parent container rotation is `gameState.outerRotationIndex * 60` degrees?
  // Actually simpler: 
  // We render slots at fixed positions inside the container.
  // We rotate the CONTAINER based on index.

  // OUTER (6 slots)
  // Angles: 0 (Top), 60 (RightTop), 120 (RightBot), 180 (Bot), 240 (LeftBot), 300 (LeftTop) -> if 0 is Top.
  // CSS Rotation 0 usually points Up if we design it that way?
  // Let's assume standard Circle: 0 is Right. 
  // To make 0 Top, we rotate -90deg.

  // Current Rotation visual:
  // User wants "Rotation" to change alignment.
  // If index increases, wheel rotates Clockwise?
  // Let's bind index to Angle: `angle = index * 60`.

  const outerRot = gameState.outerRotationIndex * 60;
  const innerRot = gameState.innerRotationIndex * 120; // 3 slots = 120 deg

  outer.style.transform = `rotate(${outerRot}deg)`;
  inner.style.transform = `rotate(${innerRot}deg)`;

  // Render Outer Slots
  for (let i = 0; i < 6; i++) {
    const slotData = gameState.outerSlots[i];
    const angle = i * 60;
    // Position: Radius ~ 50% - margin.
    // We want them distributed.
    // x = 50 + 40 * cos(a)
    // y = 50 + 40 * sin(a)
    // Adjust for Top start (-90 offset)
    const rad = (angle - 90) * (Math.PI / 180);
    const r = 42; // % radius
    const left = 50 + r * Math.cos(rad);
    const top = 50 + r * Math.sin(rad);

    const el = document.createElement('div');
    el.className = 'slot-marker cursor-pointer hover:bg-blue-100 transition-colors';
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    el.style.transform = `translate(-50%, -50%) rotate(${-outerRot}deg)`; // Counter-rotate content so it stays upright? Optional.

    // Show content mini
    const totalPigs = Object.values(slotData).reduce((a, b) => a + b, 0);
    el.innerHTML = totalPigs > 0 ? `<span class="text-[0.6rem] font-bold text-blue-800">${totalPigs}</span>` : `<span class="text-gray-300 text-xs">+</span>`;

    // Click to Manage
    el.onclick = (e) => {
      e.stopPropagation();
      openSlotManager('outer', i);
    };

    outer.appendChild(el);
  }

  // Render Inner Slots
  for (let i = 0; i < 3; i++) {
    const slotData = gameState.innerSlots[i];
    const angle = i * 120;
    const rad = (angle - 90) * (Math.PI / 180);
    const r = 35; // % relative to inner
    const left = 50 + r * Math.cos(rad);
    const top = 50 + r * Math.sin(rad);

    const el = document.createElement('div');
    el.className = 'slot-marker cursor-pointer hover:bg-yellow-200 border-yellow-600 transition-colors';
    el.style.left = `${left}%`;
    el.style.top = `${top}%`;
    // Counter rotate?
    el.style.transform = `translate(-50%, -50%) rotate(${-innerRot}deg)`;

    el.innerHTML = slotData.clay > 0 ? `<span class="text-[0.6rem] font-bold text-yellow-800">${slotData.clay}</span>` : `<span class="text-gray-300 text-xs">+</span>`;

    el.onclick = (e) => {
      e.stopPropagation();
      openSlotManager('inner', i);
    };

    inner.appendChild(el);
  }

  // Update Status Text (What is at Top?)
  // The "Top" slot is the one where `(slotIndex * Angle) + currentRotation` % 360 == 0 ?
  // Actually, if we rotate the container by `rot`, the slot at `rot` moves away from top.
  // Let's define: Top corresponds to Angle 0 on screen.
  // If container is rotated by R, the slot at index i (Angle A) is at A + R.
  // We want A + R = 0 (mod 360) => A = -R.
  // So the slot at Top is the one with Angle canceling Rotation.
  // Index = (-IndexRot) mod N.

  // Simplified:
  // Let's just track `topIndex`. 
  // If we rotate "Right" (Clockwise), visual rotates CW. The slot at Top changes from i to i-1.
  // Let's calculate proper index.

  const outMod = ((-gameState.outerRotationIndex % 6) + 6) % 6;
  const inMod = ((-gameState.innerRotationIndex % 3) + 3) % 3;

  // Display content of Top Slot
  const topOuter = gameState.outerSlots[outMod];
  const topInner = gameState.innerSlots[inMod];

  // Format text
  const innerText = topInner.clay > 0 ? `<b>${topInner.clay} Argilla</b>` : "Vuoto";

  let outerText = "Vuoto";
  const pigments = Object.entries(topOuter).filter(([k, v]) => v > 0);
  if (pigments.length > 0) {
    outerText = pigments.map(([k, v]) => `${v} ${k}`).join(', ');
  }

  document.getElementById('status-inner').innerHTML = `Int: ${innerText}`;
  document.getElementById('status-outer').innerHTML = `Est: ${outerText}`;
}

function openSlotManager(wheel, index) {
  if (!gameState.wheelUnlocked) return;

  const modal = document.getElementById('slot-modal');
  const content = document.getElementById('slot-modal-content');
  const title = document.getElementById('slot-modal-title');

  modal.classList.remove('hidden');
  title.textContent = wheel === 'inner' ? `Slot Interno ${index + 1}` : `Slot Esterno ${index + 1}`;

  // Build Interface
  if (wheel === 'inner') {
    const slot = gameState.innerSlots[index];
    // Buttons to Add/Remove Clay
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
                 <button id="btn-add-clay" class="bg-green-500 text-white w-8 h-8 rounded hover:bg-green-600">+</button>
                 <button id="btn-rem-clay" class="bg-red-500 text-white w-8 h-8 rounded hover:bg-red-600">-</button>
            </div>
        </div>
        <p class="text-xs text-gray-500 mt-2">Disponibile: ${gameState.clay} Argilla</p>
    `;

  container.querySelector('#btn-add-clay').onclick = () => {
    if (gameState.clay > 0) {
      gameState.clay--;
      slot.clay++;
      updateUI();
      renderClayManager(container, slot); // Re-render local limits
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
  // Check constraint: "Only 2 colors per slot".
  // Count distinct colors > 0
  const presentColors = Object.keys(slot).filter(k => slot[k] > 0);
  const distinct = presentColors.length;

  let html = `<div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">`;

  COLORS.forEach(c => {
    const qtyInSlot = slot[c];
    const qtyInInv = gameState.pigments[c];
    const canAdd = qtyInInv > 0 && (distinct < 2 || qtyInSlot > 0);

    html += `
        <div class="flex flex-col items-center bg-gray-50 p-2 rounded border border-gray-200">
            <span class="w-4 h-4 rounded-full mb-1 border" style="background:${c}"></span>
            <span class="text-xs font-bold">${COLOR_NAMES[c]}</span>
            <div class="flex items-center gap-2 mt-2">
                <button class="btn-color-mod bg-red-100 w-6 h-6 rounded hover:bg-red-200" data-col="${c}" data-op="-">-</button>
                <span class="font-bold text-sm">${qtyInSlot}</span>
                <button class="btn-color-mod bg-green-100 w-6 h-6 rounded hover:bg-green-200 ${!canAdd ? 'opacity-50 cursor-not-allowed' : ''}" data-col="${c}" data-op="+">+</button>
            </div>
        </div>`;
  });
  html += `</div>
    <p class="text-[0.6rem] text-gray-500 mt-2">Mas 2 tipi di colore per slot.</p>`;

  container.innerHTML = html;

  container.querySelectorAll('.btn-color-mod').forEach(btn => {
    btn.onclick = (e) => {
      const col = e.target.dataset.col;
      const op = e.target.dataset.op;

      if (op === '+') {
        const currentDistinct = Object.values(slot).filter(v => v > 0).length;
        const isNewColor = slot[col] === 0;
        if (gameState.pigments[col] > 0) {
          if (isNewColor && currentDistinct >= 2) return; // Block
          gameState.pigments[col]--;
          slot[col]++;
        }
      } else {
        if (slot[col] > 0) {
          slot[col]--;
          gameState.pigments[col]++;
        }
      }
      updateUI(); // Refreshes global inventory
      renderColorManager(container, slot); // Refreshes local view
    };
  });
}

function rotateWheel(target, dir) {
  if (gameState.coins < 1) {
    alert("Servono monete per ruotare i dischi!");
    return;
  }

  gameState.coins--;
  if (target === 'inner') {
    gameState.innerRotationIndex += dir;
    // Normalize? No, CSS handles infinite rotation. 
    // But for Index Calculation call mod logic.
  } else {
    gameState.outerRotationIndex += dir;
  }
  updateUI();
}

// --- GAME ACTIONS ---

function handleZoneClick(zone) {
  if (gameState.selectedMeepleIndex === null) {
    alert("Seleziona un asinello!");
    return;
  }

  let success = false;

  if (zone === 'river') {
    gameState.clay += 2;
    success = true;
    if (gameState.tutorialStep === 1) gameState.tutorialStep++;
  }
  else if (zone === 'market') {
    if (gameState.coins >= 1) {
      gameState.coins--;
      // Give 2 random colors
      for (let i = 0; i < 2; i++) {
        const c = COLORS[Math.floor(Math.random() * COLORS.length)];
        gameState.pigments[c]++;
      }
      success = true;
      if (gameState.tutorialStep === 2) gameState.tutorialStep++;
    } else alert("Fondi insufficienti!");
  }
  else if (zone === 'workshop') {
    gameState.wheelUnlocked = true;
    success = true;
    if (gameState.tutorialStep === 3) gameState.tutorialStep++;
  }
  else if (zone === 'oven') {
    // Validation
    const outMod = ((-gameState.outerRotationIndex % 6) + 6) % 6;
    const inMod = ((-gameState.innerRotationIndex % 3) + 3) % 3;
    const topOuter = gameState.outerSlots[outMod];
    const topInner = gameState.innerSlots[inMod];

    const comm = gameState.currentObjective;

    // Check Clay
    const hasClay = topInner.clay >= comm.reqClay;
    // Check Colors
    let hasColors = true;
    for (let [c, amt] of Object.entries(comm.reqColors)) {
      if (topOuter[c] < amt) hasColors = false;
    }

    if (hasClay && hasColors) {
      alert(`CAPOLAVORO! "${comm.name}" Completato!`);
      gameState.coins += comm.rewardMoney;
      gameState.score += comm.rewardPoints;

      // Consume? The items are in the slots.
      // Should we consume them?
      // "You bought the clay, you put it in slot."
      // "You fire it."
      // Logic dictates resources are consumed from the slot.
      topInner.clay -= comm.reqClay;
      for (let [c, amt] of Object.entries(comm.reqColors)) {
        topOuter[c] -= amt;
      }

      // New random commission?
      // For now just keep earning or randomize
      gameState.currentObjective = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
      success = true;
      if (gameState.tutorialStep === 5) gameState.tutorialStep++;
    } else {
      alert(`Errore: L'opera richiesta (${comm.name}) non combacia con i settori allineati al tornio (▼).`);
      // return false to not consume meeple?
      // Standard practice: Action fails but meeple returns? Or used?
      // Let's use meeple.
      success = true;
    }
  }

  if (success) {
    gameState.assistantsStatus[gameState.selectedMeepleIndex] = true;

    // Render Meeple on map
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
  alert("Un nuovo giorno inizia a Vietri...");
  updateUI();
}

init();
