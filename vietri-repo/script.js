// --- CONSTANTS & CONFIG ---
const LANGUAGES = ['it', 'en', 'fr'];
let currentLang = 'it';

const TRANSLATIONS = {
    it: {
        colors: { red: 'Rosso', blue: 'Blu', yellow: 'Giallo', green: 'Verde', orange: 'Arancio', purple: 'Viola' },
        ui: {
            title_sub: "Maestri della Ceramica",
            quote: '"Tra le pennellate di blu cobalto e lo splendore dei limoni..."',
            intro: "Diventa un <strong>Maestro Artigiano</strong>: raccogli argilla, compra pigmenti e crea capolavori al tornio.",
            btn_start: "Prova a giocare",
            credits: "Un gioco di M. Sabato & A. Solimene",
            rules_link: "📖 Leggi il Regolamento Ufficiale",
            shop_title: "Bottega del Maestro",
            exit: "Esci",
            tutorial_loading: "Caricamento...",
            section_donkeys: "1. I tuoi Asinelli",
            coins: "💰 Monete",
            clay: "🧱 Argilla",
            points: "🏆 Punti",
            pigments_label: "COLORI:",
            commission_label: "COMMISSIONE",
            req_label: "Richiede:",
            reward_label: "Premio:",
            section_action: "2. Scegli le azioni",
            zone_river: "Fiume",
            zone_market: "Mercato",
            zone_plaza: "Piazza",
            zone_workshop: "Bottega",
            zone_oven: "Forno",
            reset_day: "🌙 Fine Giornata (Reset)",
            section_lathe: "3. Tornio di Precisione",
            moves_left: "Mosse Rimaste:",
            lock_msg: "🔒 Vai in Bottega per usare",
            wheel_inner: "Ruota Interna",
            wheel_outer: "Ruota Esterna",
            modal_title_inner: "Slot Interno",
            modal_title_outer: "Slot Esterno",
            modal_market_title: "Mercato dei Colori",
            btn_close: "Chiudi",
            in_slot: "Nel Slot:",
            in_bag: "Disponibile nel sacco:",
            empty_color: "Nessun colore disponibile.<br>Visita il Mercato!",
            max_types: "Max 2 tipi di colore per slot.",
            market_buy: "Acquista",
            market_buy_desc: "1 Moneta = 2 Colori a caso",
            market_buy_btn: "Acquista (💰 1)",
            market_or: "- OPPURE -",
            market_trade: "Baratta",
            market_trade_desc: "Scambia 2 colori qualsiasi per 1 a scelta.",
            market_give: "Dai 2 colori:",
            market_get: "Ricevi 1 colore:",
            market_trade_btn: "Scambia (2 -> 1)",
            alert_select_meeple: "Seleziona un asinello prima!",
            alert_no_coins: "Non hai abbastanza monete (serve 1)!",
            confirm_plaza: "Sei in Piazza! Vuoi cambiare la commissione attuale con una nuova?",
            alert_new_comm: "Nuova commissione ricevuta",
            alert_magnificent: "MAGNIFICO! Hai creato",
            alert_fail: "MAMMA MIA! L'opera non è pronta.",
            alert_fail_desc: "vuole:\n- Argilla\n- Colori specifici\n\nControlla lo spicchio sotto la freccia ▼!",
            alert_day_reset: "Un nuovo giorno sorge su Vietri! (Mosse tornio ripristinate)",
            footer_info: "👋 Info? Suggerimenti? Collaborazioni? Demo? Parliamo!",
            alert_buy_success: "Acquisto completato! Colori aggiunti al sacco.",
            alert_trade_success: "Scambio completato! Colori aggiornati.",
            alert_not_enough_colors: "Non hai abbastanza colori per questo scambio!",
            alert_no_rotations: "Hai finito le mosse del tornio per oggi!"
        },
        commissions: {
            vaso_blu: "Vaso Marino",
            piatto_sole: "Piatto del Sole",
            anfora_bosco: "Anfora del Bosco",
            ciotola_fuoco: "Ciotola Fuoco",
            mosaico_reale: "Mosaico Reale"
        },
        tutorial: {
            t1: "Seleziona un asinello e visita il <b>Fiume</b> per l'argilla.",
            t2: "Visita il <b>Mercato</b> per comprare i colori (costa 1 moneta).",
            t3: "Vai alla <b>Bottega</b> per sbloccare il Tornio.",
            t4: "Clicca sugli SPICCHI del tornio per inserire materiali, poi ruota (max 3 mosse).",
            t5: "Quando allineato (▼), vai al <b>Forno</b> per completare l'opera."
        }
    },
    en: {
        colors: { red: 'Red', blue: 'Blue', yellow: 'Yellow', green: 'Green', orange: 'Orange', purple: 'Purple' },
        ui: {
            title_sub: "Masters of Ceramics",
            quote: '"Between brushstrokes of cobalt blue and the splendor of lemons..."',
            intro: "Become a <strong>Master Craftsman</strong>: gather clay, buy pigments, and create masterpieces on the lathe.",
            btn_start: "Play Now",
            credits: "A game by M. Sabato & A. Solimene",
            rules_link: "📖 Read Official Rules",
            shop_title: "Master's Workshop",
            exit: "Exit",
            tutorial_loading: "Loading...",
            section_donkeys: "1. Your Donkeys",
            coins: "💰 Coins",
            clay: "🧱 Clay",
            points: "🏆 Points",
            pigments_label: "COLORS:",
            commission_label: "COMMISSION",
            req_label: "Requires:",
            reward_label: "Reward:",
            section_action: "2. Choose Actions",
            zone_river: "River",
            zone_market: "Market",
            zone_plaza: "Plaza",
            zone_workshop: "Workshop",
            zone_oven: "Oven",
            reset_day: "🌙 End of Day (Reset)",
            section_lathe: "3. Precision Lathe",
            moves_left: "Moves Left:",
            lock_msg: "🔒 Go to Workshop to use",
            wheel_inner: "Inner Wheel",
            wheel_outer: "Outer Wheel",
            modal_title_inner: "Inner Slot",
            modal_title_outer: "Outer Slot",
            modal_market_title: "Color Market",
            btn_close: "Close",
            in_slot: "In Slot:",
            in_bag: "Available in bag:",
            empty_color: "No colors available.<br>Visit the Market!",
            max_types: "Max 2 color types per slot.",
            market_buy: "Buy",
            market_buy_desc: "1 Coin = 2 Random Colors",
            market_buy_btn: "Buy (💰 1)",
            market_or: "- OR -",
            market_trade: "Trade",
            market_trade_desc: "Trade any 2 colors for 1 of choice.",
            market_give: "Give 2:",
            market_get: "Get 1:",
            market_trade_btn: "Trade (2 -> 1)",
            alert_select_meeple: "Select a donkey first!",
            alert_no_coins: "Not enough coins (needs 1)!",
            confirm_plaza: "You are in the Plaza! Do you want to swap your current commission for a new one?",
            alert_new_comm: "New commission received",
            alert_magnificent: "MAGNIFICENT! You created",
            alert_fail: "MAMMA MIA! The work is not ready.",
            alert_fail_desc: "needs:\n- Clay\n- Specific colors\n\nCheck the slice under the arrow ▼!",
            alert_day_reset: "A new day dawns over Vietri! (Lathe moves restored)",
            footer_info: "👋 Info? Suggestions? Collabs? Demo? Let's talk!",
            alert_buy_success: "Purchase complete! Colors added to bag.",
            alert_trade_success: "Trade complete! Colors updated.",
            alert_not_enough_colors: "Not enough colors for this trade!",
            alert_no_rotations: "No lathe moves left for today!"
        },
        commissions: {
            vaso_blu: "Sea Vase",
            piatto_sole: "Sun Plate",
            anfora_bosco: "Forest Amphora",
            ciotola_fuoco: "Fire Bowl",
            mosaico_reale: "Royal Mosaic"
        },
        tutorial: {
            t1: "Select a donkey and visit the <b>River</b> for clay.",
            t2: "Visit the <b>Market</b> to buy colors (costs 1 coin).",
            t3: "Go to the <b>Workshop</b> to unlock the Lathe.",
            t4: "Click on the lathe SLICES to insert materials, then rotate (max 3 moves).",
            t5: "When aligned (▼), go to the <b>Oven</b> to complete the work."
        }
    },
    fr: {
        colors: { red: 'Rouge', blue: 'Bleu', yellow: 'Jaune', green: 'Vert', orange: 'Orange', purple: 'Violet' },
        ui: {
            title_sub: "Maîtres de la Céramique",
            quote: '"Entre coups de pinceau bleu cobalt et la splendeur des citrons..."',
            intro: "Devenez un <strong>Maître Artisan</strong> : récoltez l'argile, achetez des pigments et créez des chefs-d'œuvre au tour.",
            btn_start: "Jouer Maintenant",
            credits: "Un jeu de M. Sabato & A. Solimene",
            rules_link: "📖 Lire le Règlement Officiel",
            shop_title: "Atelier du Maître",
            exit: "Quitter",
            tutorial_loading: "Chargement...",
            section_donkeys: "1. Vos Ânes",
            coins: "💰 Pièces",
            clay: "🧱 Argile",
            points: "🏆 Points",
            pigments_label: "COULEURS:",
            commission_label: "COMMANDE",
            req_label: "Requis :",
            reward_label: "Récompense :",
            section_action: "2. Choisir Actions",
            zone_river: "Rivière",
            zone_market: "Marché",
            zone_plaza: "Place",
            zone_workshop: "Atelier",
            zone_oven: "Four",
            reset_day: "🌙 Fin de Journée (Reset)",
            section_lathe: "3. Tour de Précision",
            moves_left: "Mouvements restants :",
            lock_msg: "🔒 Allez à l'Atelier pour utiliser",
            wheel_inner: "Roue Intérieure",
            wheel_outer: "Roue Extérieure",
            modal_title_inner: "Emplacement Interne",
            modal_title_outer: "Emplacement Externe",
            modal_market_title: "Marché des Couleurs",
            btn_close: "Fermer",
            in_slot: "Dans l'emplacement :",
            in_bag: "Disponible dans le sac :",
            empty_color: "Aucune couleur disponible.<br>Visitez le Marché !",
            max_types: "Max 2 types de couleurs par emplacement.",
            market_buy: "Acheter",
            market_buy_desc: "1 Pièce = 2 Couleurs au hasard",
            market_buy_btn: "Acheter (💰 1)",
            market_or: "- OU -",
            market_trade: "Échanger",
            market_trade_desc: "Échangez 2 couleurs contre 1 au choix.",
            market_give: "Donner 2 :",
            market_get: "Recevoir 1 :",
            market_trade_btn: "Échanger (2 -> 1)",
            alert_select_meeple: "Sélectionnez d'abord un âne !",
            alert_no_coins: "Pas assez de pièces (il en faut 1) !",
            confirm_plaza: "Vous êtes sur la Place ! Voulez-vous échanger votre commande actuelle contre une nouvelle ?",
            alert_new_comm: "Nouvelle commande reçue",
            alert_magnificent: "MAGNIFIQUE ! Vous avez créé",
            alert_fail: "MAMMA MIA ! L'œuvre n'est pas prête.",
            alert_fail_desc: "nécessite :\n- Argile\n- Couleurs spécifiques\n\nVérifiez la part sous la flèche ▼!",
            alert_day_reset: "Un nouveau jour se lève sur Vietri ! (Mouvements du tour restaurés)",
            footer_info: "👋 Info? Suggestions? Collabs ? Démo ? Parlons-en !",
            alert_buy_success: "Achat terminé ! Couleurs ajoutées au sac.",
            alert_trade_success: "Échange terminé ! Couleurs mises à jour.",
            alert_not_enough_colors: "Pas assez de couleurs pour cet échange !",
            alert_no_rotations: "Plus de mouvements de tour pour aujourd'hui !"
        },
        commissions: {
            vaso_blu: "Vase Marin",
            piatto_sole: "Assiette Soleil",
            anfora_bosco: "Amphore Forêt",
            ciotola_fuoco: "Bol de Feu",
            mosaico_reale: "Mosaïque Royale"
        },
        tutorial: {
            t1: "Sélectionnez un âne et visitez la <b>Rivière</b> pour l'argile.",
            t2: "Visitez le <b>Marché</b> pour acheter des couleurs (coûte 1 pièce).",
            t3: "Allez à l'<b>Atelier</b> pour débloquer le Tour.",
            t4: "Cliquez sur les PARTS du tour pour insérer des matériaux, puis tournez (max 3 coups).",
            t5: "Une fois aligné (▼), allez au <b>Four</b> pour terminer l'œuvre."
        }
    }
};

const COLORS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];
// COLOR_NAMES removed - used from TRANSLATIONS


const COMMISSIONS_DATA = [
    { id: 'vaso_blu', reqClay: 1, reqColors: { blue: 1 }, rewardMoney: 3, rewardPoints: 2 },
    { id: 'piatto_sole', reqClay: 1, reqColors: { yellow: 1 }, rewardMoney: 3, rewardPoints: 2 },
    { id: 'anfora_bosco', reqClay: 2, reqColors: { green: 1, orange: 1 }, rewardMoney: 5, rewardPoints: 4 },
    { id: 'ciotola_fuoco', reqClay: 1, reqColors: { red: 2 }, rewardMoney: 4, rewardPoints: 2 },
    { id: 'mosaico_reale', reqClay: 3, reqColors: { blue: 2, yellow: 2 }, rewardMoney: 8, rewardPoints: 6 }
];
// We'll dynamically get names based on ID + Lang

const COMMISSIONS = COMMISSIONS_DATA;

// --- STATE ---
const gameState = {
    language: 'it', // DEFAULT
    coins: 5,
    clay: 0,
    pigments: { red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0 },

    assistants: 3,
    assistantsStatus: [false, false, false],
    selectedMeepleIndex: null,

    score: 0,
    currentObjectives: [COMMISSIONS[0], COMMISSIONS[1]], // DUAL COMMISSIONS

    wheelUnlocked: false,
    rotationActions: 3,

    innerSlots: [{ clay: 0 }, { clay: 0 }, { clay: 0 }],
    innerRotationIndex: 0,

    outerSlots: Array(6).fill(null).map(() => ({ red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0 })),
    outerRotationIndex: 0,

    tutorialStep: 1,

    // Daily Reset
    resetDaily: function () {
        this.assistantsStatus = [false, false, false];
        this.selectedMeepleIndex = null;
        this.rotationActions = 3;
    }
};

// --- RENDERERS ---
function t(key) {
    return TRANSLATIONS[gameState.language].ui[key] || key;
}

function setLanguage(lang) {
    gameState.language = lang;
    const app = document.getElementById('app');
    if (document.getElementById('view-game')) {
        app.innerHTML = renderGame();
        startGameLoop();
    } else {
        init();
    }
}

function renderLangSwitcher() {
    return `
            <div class="absolute top-2 right-2 flex gap-2 z-50">
                <button onclick="setLanguage('it')" class="w-8 h-8 rounded-full border-2 border-white shadow hover:scale-110 transition overflow-hidden ${gameState.language === 'it' ? 'ring-2 ring-yellow-400' : 'opacity-70'}">
                    <img src="https://flagcdn.com/w40/it.png" alt="IT" class="w-full h-full object-cover">
                </button>
                <button onclick="setLanguage('en')" class="w-8 h-8 rounded-full border-2 border-white shadow hover:scale-110 transition overflow-hidden ${gameState.language === 'en' ? 'ring-2 ring-yellow-400' : 'opacity-70'}">
                    <img src="https://flagcdn.com/w40/gb.png" alt="EN" class="w-full h-full object-cover">
                </button>
                <button onclick="setLanguage('fr')" class="w-8 h-8 rounded-full border-2 border-white shadow hover:scale-110 transition overflow-hidden ${gameState.language === 'fr' ? 'ring-2 ring-yellow-400' : 'opacity-70'}">
                    <img src="https://flagcdn.com/w40/fr.png" alt="FR" class="w-full h-full object-cover">
                </button>
            </div>
        `;
}

function renderHome() {
    return `
        <div id="view-home" class="w-full max-w-4xl p-4 fade-in relative">
            <div class="maiolica-border rounded-xl">
                <div class="maiolica-content text-center space-y-6 p-4 relative">
                    ${renderLangSwitcher()}
                    <div class="mb-4 mt-8">
                        <h1 class="text-5xl md:text-7xl font-bold uppercase tracking-widest text-blue-800 drop-shadow-sm">Vietri</h1>
                        <h2 class="text-2xl md:text-3xl text-yellow-600 font-serif italic mt-2">${t('title_sub')}</h2>
                    </div>
                    <div class="max-w-2xl text-gray-700 leading-relaxed text-lg mx-auto">
                        <p class="italic mb-4">${t('quote')}</p>
                        <p class="mb-2">${t('intro')}</p>
                    </div>
                        <div class="mt-8 flex flex-col items-center gap-3">
                            <button id="btn-start-game" class="btn-start rounded-full px-8 py-3">${t('btn_start')}</button>
                            <a href="vietri-repo/rules.html" target="_blank" class="text-blue-700 underline font-bold hover:text-blue-900 flex items-center gap-1">
                                 ${t('rules_link')}
                            </a>
                            <p class="text-xs text-gray-400 mt-2">${t('credits')}</p>
                        </div>

                        <!-- CONTACT FOOTER -->
                        <div class="mt-8 border-t-2 border-gray-100 pt-4">
                            <p class="font-bold text-vietri-blue text-sm mb-3">${t('footer_info')}</p>
                            <div class="flex justify-center items-center gap-6">
                                <a href="https://linktr.ee/JustMax76" target="_blank" class="hover:scale-125 transition-transform flex flex-col items-center gap-1 group">
                                    <span class="text-3xl filter drop-shadow-sm group-hover:drop-shadow-md">🌳</span>
                                    <span class="text-[0.6rem] text-gray-500 uppercase tracking-wider font-bold">Links</span>
                                </a>
                                <a href="https://wa.me/393295644852" target="_blank" class="hover:scale-125 transition-transform flex flex-col items-center gap-1 group">
                                    <span class="text-3xl filter drop-shadow-sm group-hover:drop-shadow-md">💬</span>
                                    <span class="text-[0.6rem] text-gray-500 uppercase tracking-wider font-bold">WhatsApp</span>
                                </a>
                                <a href="mailto:massi.sabato@gmail.com" class="hover:scale-125 transition-transform flex flex-col items-center gap-1 group">
                                    <span class="text-3xl filter drop-shadow-sm group-hover:drop-shadow-md">📧</span>
                                    <span class="text-[0.6rem] text-gray-500 uppercase tracking-wider font-bold">Email</span>
                                </a>
                            </div>
                        </div>
                </div>
            </div>
        </div>`;
}

function renderGame() {
    return `
        <div id="view-game" class="w-full max-w-7xl p-2 md:p-6 fade-in min-h-screen lg:h-screen flex flex-col relative bg-gray-100/50">
            
            <div class="flex justify-between items-center mb-2 px-2 shrink-0 bg-white/90 backdrop-blur p-2 rounded shadow-sm sticky top-0 z-50 lg:static">
                <div><h1 class="text-xl md:text-2xl font-bold text-vietri-blue">${t('shop_title')}</h1></div>
                
                <div class="flex items-center gap-4">
                    ${renderLangSwitcher().replace('absolute top-2 right-2', '')}
                    <button id="btn-exit" class="text-sm underline text-blue-600 font-bold">${t('exit')}</button>
                </div>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 rounded shadow-sm mx-2 shrink-0">
                <p id="tutorial-text" class="text-gray-800 text-sm md:text-base font-medium">${t('tutorial_loading')}</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow overflow-visible lg:overflow-hidden pb-10 lg:pb-0">
                
                <!-- LEFT (Resources & Commissions) -->
                <div class="lg:col-span-3 flex flex-col gap-2 lg:overflow-y-auto">
                    <div class="vietri-card p-4 text-center bg-white shadow-md relative z-40">
                        <h4 class="font-bold text-blue-800 mb-2">${t('section_donkeys')}</h4>
                        <div id="donkey-container" class="flex justify-center gap-2 mb-4"></div>
                        
                        <div class="space-y-2 text-sm text-left px-2 border-t pt-2">
                            <div class="flex justify-between"><span>${t('coins')}:</span> <span id="val-coins" class="font-bold"></span></div>
                            <div class="flex justify-between"><span>${t('clay')}:</span> <span id="val-clay" class="font-bold"></span></div>
                            <div class="flex justify-between"><span>${t('points')}:</span> <span id="val-score" class="font-bold"></span></div>
                            <div class="font-bold text-xs text-gray-500 mt-2 mb-1">${t('pigments_label')}</div>
                            <div id="pigments-list" class="grid grid-cols-3 gap-1 text-xs"></div>
                        </div>
                    </div>

                    <div class="vietri-card p-4 bg-white border-yellow-400 text-center relative flex-grow lg:overflow-y-auto">
                        <div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white text-xs px-2 py-1 rounded shadow-sm">${t('commission_label')}</div>
                        <div id="commissions-list" class="space-y-3 mt-2"></div>
                    </div>
                </div>

                <!-- CENTER MAP -->
                <div class="lg:col-span-6 flex flex-col items-center justify-center relative min-h-[400px] lg:min-h-0">
                    <div class="vietri-card p-6 w-full h-full flex flex-col items-center justify-center bg-blue-50/30 backdrop-blur-sm">
                        <h3 class="font-bold mb-4 text-center text-vietri-blue">${t('section_action')}</h3>
                        <div class="map-container relative rounded-full">
                            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center font-bold text-blue-800 text-sm border border-blue-200 shadow-md bg-white z-20">VIETRI</div>
                            
                            <div id="zone-river" class="map-zone pos-1 absolute cursor-pointer flex flex-col items-center justify-center">
                                <div class="text-2xl">🌊</div><div class="text-[0.6rem] font-bold">${t('zone_river')}</div>
                                <div id="meeple-river" class="absolute -bottom-2 right-0"></div>
                            </div>
                            <div id="zone-market" class="map-zone pos-2 absolute cursor-pointer flex flex-col items-center justify-center">
                                <div class="text-2xl">🎨</div><div class="text-[0.6rem] font-bold">${t('zone_market')}</div>
                                <div id="meeple-market" class="absolute -bottom-2 right-0"></div>
                            </div>
                            <div id="zone-plaza" class="map-zone pos-3 absolute cursor-pointer flex flex-col items-center justify-center">
                                <div class="text-2xl">📜</div><div class="text-[0.6rem] font-bold">${t('zone_plaza')}</div>
                                <div id="meeple-plaza" class="absolute -bottom-2 right-0"></div>
                            </div>
                            <div id="zone-workshop" class="map-zone pos-4 absolute cursor-pointer flex flex-col items-center justify-center">
                                <div class="text-2xl">🏺</div><div class="text-[0.6rem] font-bold">${t('zone_workshop')}</div>
                                <div id="meeple-workshop" class="absolute -bottom-2 right-0"></div>
                            </div>
                            <div id="zone-oven" class="map-zone pos-5 absolute cursor-pointer flex flex-col items-center justify-center">
                                <div class="text-2xl">🔥</div><div class="text-[0.6rem] font-bold">${t('zone_oven')}</div>
                                <div id="meeple-oven" class="absolute -bottom-2 right-0"></div>
                            </div>
                        </div>
                        <button id="btn-end-round" class="mt-8 bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-black font-bold shadow-lg text-sm transition-transform hover:scale-105">
                            ${t('reset_day')}
                        </button>
                    </div>
                </div>

                <!-- RIGHT LATHE -->
                <div class="lg:col-span-3 flex flex-col gap-2">
                    <div class="vietri-card p-4 text-center h-full flex flex-col">
                        <h4 class="font-bold mb-1 text-vietri-blue">${t('section_lathe')}</h4>
                        
                        <div class="flex justify-between items-center text-xs px-4 mb-2">
                            <span class="font-bold text-gray-600">${t('moves_left')}</span>
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
                                        <span class="font-bold mb-1 text-yellow-800">${t('wheel_inner')}</span>
                                        <div class="flex gap-2">
                                            <button class="btn-rotate bg-yellow-600 text-white w-8 h-8 rounded-full shadow hover:bg-yellow-700" data-target="inner" data-dir="-1">↺</button>
                                            <button class="btn-rotate bg-yellow-600 text-white w-8 h-8 rounded-full shadow hover:bg-yellow-700" data-target="inner" data-dir="1">↻</button>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-center bg-blue-50 p-2 rounded border border-blue-200">
                                        <span class="font-bold mb-1 text-blue-800">${t('wheel_outer')}</span>
                                        <div class="flex gap-2">
                                            <button class="btn-rotate bg-blue-600 text-white w-8 h-8 rounded-full shadow hover:bg-blue-700" data-target="outer" data-dir="-1">↺</button>
                                            <button class="btn-rotate bg-blue-600 text-white w-8 h-8 rounded-full shadow hover:bg-blue-700" data-target="outer" data-dir="1">↻</button>
                                        </div>
                                    </div>
                               </div>
                            </div>
                        </div>
                        <div id="lathe-lock-msg" class="text-red-500 font-bold text-sm mt-4">${t('lock_msg')}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- MODAL -->
        <div id="slot-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full border-4 border-vietri-blue">
                <h3 class="text-xl font-bold text-vietri-blue mb-4" id="slot-modal-title">...</h3>
                <div id="slot-modal-content" class="space-y-4"></div>
                <div class="mt-6 flex justify-end gap-2">
                    <button id="btn-close-modal" class="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded">${t('btn_close')}</button>
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

    // DUAL COMMISSIONS RENDER
    const commList = document.getElementById('commissions-list');
    if (commList) {
        commList.innerHTML = '';
        const currentObjs = gameState.currentObjectives || (gameState.currentObjective ? [gameState.currentObjective] : []);

        currentObjs.forEach(obj => {
            const card = document.createElement('div');
            card.className = "text-sm text-gray-700 bg-gray-50 p-2 rounded text-left border border-gray-200 shadow-sm";

            // Localized Name
            const commName = TRANSLATIONS[gameState.language].commissions[obj.id] || obj.id;

            // Localized Requirements
            const clayLabel = TRANSLATIONS[gameState.language].ui.clay || "Argilla";
            let reqText = `<b class="text-xs text-gray-800">${obj.reqClay} ${clayLabel}</b>`;

            const colKeys = Object.keys(obj.reqColors);
            if (colKeys.length > 0) {
                reqText += `<br><span class="text-[0.6rem] text-gray-500 uppercase font-bold">${TRANSLATIONS[gameState.language].ui.pigments_label}</span> `;
                reqText += colKeys.map(k => {
                    const colName = TRANSLATIONS[gameState.language].colors[k];
                    return `<span style="color:${k === 'yellow' ? '#d4af37' : k}" class="font-bold">${obj.reqColors[k]} ${colName}</span>`;
                }).join(', ');
            }

            const rewardLabel = TRANSLATIONS[gameState.language].ui.reward_label || "Premio:";

            card.innerHTML = `
                <div class="font-bold text-blue-900 border-b pb-1 mb-1 text-xs uppercase tracking-wide">${commName}</div>
                <div class="text-[0.65rem] mb-1 leading-tight">${reqText}</div>
                <div class="text-xs text-green-700 font-bold border-t pt-1 mt-1 flex justify-between items-center">
                   <span class="text-[0.6rem] text-gray-500 uppercase">${rewardLabel}</span>
                   <div class="flex gap-2">
                        <span>💰 ${obj.rewardMoney}</span>
                        <span>🏆 ${obj.rewardPoints}</span>
                   </div>
                </div>
            `;
            commList.appendChild(card);
        });
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
    if (!document.getElementById('disk-inner')) return;

    // INNER
    const innerDisk = document.getElementById('disk-inner');
    innerDisk.style.transform = `rotate(${gameState.innerRotationIndex * 120}deg)`;
    innerDisk.innerHTML = '';

    gameState.innerSlots.forEach((slotData, index) => {
        const rotation = index * 120;
        const el = document.createElement('div');
        el.className = 'absolute top-0 left-0 w-full h-full flex justify-center items-start pt-2 slot-clickable hover:bg-white/10 transition-colors cursor-pointer';
        el.style.transform = `rotate(${rotation}deg)`;
        // FIX: Clip path to prevent overlap of hit area (120 degrees)
        el.style.clipPath = 'polygon(50% 50%, -50% -50%, 150% -50%)';
        el.onclick = (e) => { e.stopPropagation(); openSlotModal('inner', index); };

        // Clay
        let dots = '';
        if (slotData.clay > 0) {
            for (let k = 0; k < slotData.clay; k++) dots += `<div class="w-4 h-3 bg-stone-400 border border-stone-600 rounded-sm shadow-sm inline-block mx-0.5"></div>`;
            el.innerHTML = `<div class="flex flex-col justify-center items-center gap-0.5 mt-2">${dots}</div>`;
        } else {
            el.innerHTML = '<span class="text-gray-400 text-lg opacity-50 mt-2">+</span>';
        }

        // Divider
        const line = document.createElement('div');
        line.className = 'absolute top-0 left-1/2 w-0.5 h-1/2 bg-yellow-600/30 origin-bottom transform -translate-x-1/2 pointer-events-none';
        innerDisk.appendChild(el);
    });

    // OUTER
    const outerDisk = document.getElementById('disk-outer');
    outerDisk.style.transform = `rotate(${gameState.outerRotationIndex * 60}deg)`;
    outerDisk.innerHTML = '';

    gameState.outerSlots.forEach((slotData, index) => {
        const rotation = index * 60;
        const el = document.createElement('div');
        el.className = 'absolute top-0 left-0 w-full h-full flex justify-center items-start pt-2 slot-clickable hover:bg-white/10 transition-colors cursor-pointer';
        el.style.transform = `rotate(${rotation}deg)`;
        // FIX: Clip path for 60 degrees (approx triangle)
        el.style.clipPath = 'polygon(50% 50%, 20% 0%, 80% 0%)';
        el.onclick = (e) => { e.stopPropagation(); openSlotModal('outer', index); };

        // Pigments
        let dots = '';
        let hasItems = false;
        for (const [col, qty] of Object.entries(slotData)) {
            if (qty > 0) {
                hasItems = true;
                for (let k = 0; k < qty; k++) dots += `<div class="w-3 h-3 rounded-full bg-${col}-500 border border-white shadow-sm inline-block mx-px"></div>`;
                if (qty > 0) dots += '<br>';
            }
        }

        if (hasItems) {
            el.innerHTML = `<div class="mt-2 text-center leading-none">${dots}</div>`;
        } else {
            el.innerHTML = '<span class="text-gray-400 text-lg opacity-50 mt-2">+</span>';
        }

        outerDisk.appendChild(el);
    });
}

function openSlotModal(type, index) {
    if (!gameState.wheelUnlocked) {
        alert(t('lock_msg'));
        return;
    }

    const modal = document.getElementById('slot-modal');
    const title = document.getElementById('slot-modal-title');
    const content = document.getElementById('slot-modal-content');

    // Title translation
    title.textContent = (type === 'inner' ? t('modal_title_inner') : t('modal_title_outer')) + ` ${index + 1}`;

    // Render
    let html = '';

    if (type === 'inner') {
        // Clay
        const current = gameState.innerSlots[index].clay; // FIXED
        const inventory = gameState.clay;
        html += `
            <div class="flex justify-between items-center bg-gray-50 p-3 rounded">
                <span>${t('in_slot')} <b class="text-xl">${current}</b></span>
                <div class="flex gap-2">
                    <button class="bg-red-200 hover:bg-red-300 w-8 h-8 rounded font-bold" onclick="modSlot('inner', ${index}, 'clay', -1)">-</button>
                    <button class="bg-green-200 hover:bg-green-300 w-8 h-8 rounded font-bold" onclick="modSlot('inner', ${index}, 'clay', 1)">+</button>
                </div>
            </div>
            <div class="text-sm text-gray-500 text-right">${t('in_bag')} ${inventory}</div>
        `;
    } else {
        // Pigments
        const slot = gameState.outerSlots[index]; // FIXED
        // Filter colors visible
        const visibleColors = COLORS.filter(c => slot[c] > 0 || gameState.pigments[c] > 0);

        if (visibleColors.length === 0) {
            html = `<p class="text-center text-gray-500 italic py-4">${t('empty_color')}</p>`;
        } else {
            html += `<div class="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">`;
            visibleColors.forEach(c => {
                const name = TRANSLATIONS[gameState.language].colors[c];
                html += `
                    <div class="flex justify-between items-center border p-2 rounded">
                        <div class="flex items-center gap-1">
                            <div class="w-3 h-3 rounded-full bg-${c}-500"></div>
                            <span class="text-xs font-bold">${name}</span>
                        </div>
                        <div class="flex flex-col items-end">
                            <div class="flex gap-1">
                                <button class="px-2 bg-gray-200 rounded hover:bg-gray-300" onclick="modSlot('outer', ${index}, '${c}', -1)">-</button>
                                <span class="w-4 text-center font-bold">${slot[c] || 0}</span>
                                <button class="px-2 bg-gray-200 rounded hover:bg-gray-300" onclick="modSlot('outer', ${index}, '${c}', 1)">+</button>
                            </div>
                            <span class="text-[0.6rem] text-gray-400">Sac: ${gameState.pigments[c]}</span>
                        </div>
                    </div>
                 `;
            });
            html += `</div><p class="text-[0.6rem] text-gray-500 mt-2 text-center">${t('max_types')}</p>`;
        }
    }

    content.innerHTML = html;
    modal.classList.remove('hidden');
}

function modSlot(type, index, item, amount) {
    if (type === 'inner') {
        const slot = gameState.innerSlots[index];
        if (amount > 0) {
            if (gameState.clay >= amount) {
                gameState.clay -= amount;
                slot.clay += amount;
            }
        } else {
            if (slot.clay >= -amount) {
                gameState.clay -= amount;
                slot.clay += amount;
            }
        }
    } else {
        const slot = gameState.outerSlots[index];
        if (amount > 0) {
            // Add
            if (gameState.pigments[item] > 0) {
                const currentTypes = Object.values(slot).filter(v => v > 0).length;
                if (slot[item] > 0 || currentTypes < 2) {
                    gameState.pigments[item]--;
                    slot[item]++;
                }
            }
        } else {
            // Remove
            if (slot[item] > 0) {
                gameState.pigments[item]++;
                slot[item]--;
            }
        }
    }
    updateUI();
    openSlotModal(type, index);
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
            <span class="text-xs font-bold text-gray-700">${TRANSLATIONS[gameState.language].colors[c]}</span>
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
                    slot[col] = (slot[col] || 0) + 1;
                    gameState.pigments[col]--;
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
        alert(t('select_meeple_first'));
        return;
    }

    const modal = document.getElementById('slot-modal');
    const title = document.getElementById('slot-modal-title');
    const content = document.getElementById('slot-modal-content');

    title.textContent = t('modal_market_title');

    content.innerHTML = `
        <div class="space-y-6">
            <!-- BUY -->
            <div class="bg-blue-50 p-4 rounded border border-blue-200">
                <h4 class="font-bold text-blue-800 mb-1">${t('market_buy')}</h4>
                <p class="text-xs text-gray-600 mb-2">${t('market_buy_desc')}</p>
                <button class="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 shadow" onclick="finalizeMarketAction('buy')">
                    ${t('market_buy_btn')}
                </button>
            </div>

            <div class="text-center font-bold text-gray-400 text-sm">${t('market_or')}</div>

            <!-- TRADE -->
            <div class="bg-orange-50 p-4 rounded border border-orange-200">
                <h4 class="font-bold text-orange-800 mb-1">${t('market_trade')}</h4>
                <p class="text-xs text-gray-600 mb-2">${t('market_trade_desc')}</p>
                
                <div class="space-y-2">
                    <div class="flex flex-col gap-1">
                        <label class="text-xs font-bold text-gray-700">${t('market_give')}</label>
                        <div class="flex gap-2">
                            <select id="trade-give-1" class="border rounded p-1 text-sm flex-1 bg-white">${getColorOptions()}</select>
                            <select id="trade-give-2" class="border rounded p-1 text-sm flex-1 bg-white">${getColorOptions()}</select>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                         <label class="text-xs font-bold text-gray-700">${t('market_get')}</label>
                         <select id="trade-get" class="border rounded p-1 text-sm w-full bg-white">${getColorOptions()}</select>
                    </div>
                </div>

                <button class="w-full bg-orange-600 text-white font-bold py-2 rounded hover:bg-orange-700 shadow mt-3" onclick="finalizeMarketAction('trade')">
                    ${t('market_trade_btn')}
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function getColorOptions() {
    // Generate <option> tags localized
    return COLORS.map(c => `<option value="${c}">${TRANSLATIONS[gameState.language].colors[c]}</option>`).join('');
}



function finalizeMarketAction(actionType) {
    const modal = document.getElementById('slot-modal');
    modal.classList.add('hidden');

    if (actionType === 'buy') {
        if (gameState.coins < 1) {
            alert(t('alert_no_coins')); // ALERT TRANSLATED
            return;
        }
        gameState.coins--;
        const c1 = COLORS[Math.floor(Math.random() * COLORS.length)];
        const c2 = COLORS[Math.floor(Math.random() * COLORS.length)];
        gameState.pigments[c1]++;
        gameState.pigments[c2]++;
        updateUI();
        document.getElementById('slot-modal').classList.add('hidden');
    } else if (actionType === 'trade') {
        const give1 = document.getElementById('trade-give-1').value;
        const give2 = document.getElementById('trade-give-2').value;
        const get = document.getElementById('trade-get').value;

        if (gameState.pigments[give1] > 0 && (give1 !== give2 ? gameState.pigments[give2] > 0 : gameState.pigments[give1] >= 2)) {
            gameState.pigments[give1]--;
            gameState.pigments[give2]--;
            gameState.pigments[get]++;
            updateUI();
            document.getElementById('slot-modal').classList.add('hidden');
        } else {
            alert(t('alert_not_enough_colors')); // Use fallback or add translation for this? Adding generic fail for now or keep text
        }
    }

    gameState.assistantsStatus[gameState.selectedMeepleIndex] = true;
    const m = document.createElement('div');
    m.textContent = '🫏';
    m.className = 'absolute text-xl animate-bounce';
    document.getElementById(`meeple-${gameState.currentZone}`).appendChild(m); // Changed from 'meeple-${z}' to 'meeple-${gameState.currentZone}'
    gameState.selectedMeepleIndex = null;

    if (gameState.tutorialStep === 2) gameState.tutorialStep++;

    updateUI();
    alert(actionType === "buy" ? t('alert_buy_success') : t('alert_trade_success')); // ALERT TRANSLATED
}

function rotateWheel(target, dir) {
    if (gameState.rotationActions <= 0) {
        alert(t('alert_no_rotations')); // ALERT TRANSLATED
        return;
    }
    gameState.rotationActions--;
    if (target === 'inner') gameState.innerRotationIndex += dir;
    else gameState.outerRotationIndex += dir;
    updateUI();
}

function handleZoneClick(zone) {
    if (gameState.selectedMeepleIndex === null) {
        alert(t('alert_select_meeple')); // ALERT TRANSLATED
        return;
    }

    // FIX: Track current zone for meeple placement
    gameState.currentZone = zone;

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
        if (confirm(t('confirm_plaza'))) { // "Vuoi cambiare commissione?" - generic enough
            let newObj1, newObj2;
            const currentObjs = gameState.currentObjectives || [];

            // Generate 2 new distinct ones
            do {
                newObj1 = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
            } while (currentObjs.some(o => o.id === newObj1.id));

            do {
                newObj2 = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
            } while (newObj2.id === newObj1.id || currentObjs.some(o => o.id === newObj2.id && COMMISSIONS.length > 3));

            gameState.currentObjectives = [newObj1, newObj2];
            alert(t('alert_new_comm'));
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

        let completedIndex = -1;
        const currentObjs = gameState.currentObjectives || [];

        // Check against ALL current objectives
        for (let i = 0; i < currentObjs.length; i++) {
            const comm = currentObjs[i];
            const hasClay = topInner.clay >= comm.reqClay;
            let hasColors = true;
            for (let [c, amt] of Object.entries(comm.reqColors)) {
                if (topOuter[c] < amt) hasColors = false;
            }

            if (hasClay && hasColors) {
                completedIndex = i;
                break; // Complete the first valid one found
            }
        }

        if (completedIndex !== -1) {
            const comm = currentObjs[completedIndex];
            alert(`${t('alert_magnificent')} ${comm.name}!`);
            gameState.coins += comm.rewardMoney;
            gameState.score += comm.rewardPoints;
            topInner.clay -= comm.reqClay;
            for (let [c, amt] of Object.entries(comm.reqColors)) topOuter[c] -= amt;

            // Replace executed commission
            let newComm;
            do {
                newComm = COMMISSIONS[Math.floor(Math.random() * COMMISSIONS.length)];
            } while (currentObjs.some(o => o.id === newComm.id) && COMMISSIONS.length > 2);

            gameState.currentObjectives[completedIndex] = newComm;

            success = true;
            if (gameState.tutorialStep === 5) gameState.tutorialStep++;
        } else {
            alert(t('alert_fail') + "\n" + t('alert_fail_desc')); // ALERT TRANSLATED
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
