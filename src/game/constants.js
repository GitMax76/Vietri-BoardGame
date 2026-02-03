export const COLORS = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];

export const COLOR_NAMES = {
    'red': 'Rosso',
    'blue': 'Blu',
    'yellow': 'Giallo',
    'green': 'Verde',
    'orange': 'Arancio',
    'purple': 'Viola'
};

export const COMMISSIONS = [
    {
        id: 'vaso_blu', name: "Vaso Marino",
        reqClay: 1, reqColors: { blue: 1 }, // Changed to object for flexibilty
        rewardMoney: 3, rewardPoints: 2
    },
    {
        id: 'piatto_sole', name: "Piatto del Sole",
        reqClay: 1, reqColors: { yellow: 1 },
        rewardMoney: 3, rewardPoints: 2
    },
    {
        id: 'anfora_bosco', name: "Anfora del Bosco",
        reqClay: 2, reqColors: { green: 1, orange: 1 }, // Example complex req
        rewardMoney: 5, rewardPoints: 4
    },
    {
        id: 'ciotola_fuoco', name: "Ciotola Fuoco",
        reqClay: 1, reqColors: { red: 2 },
        rewardMoney: 4, rewardPoints: 2
    },
    {
        id: 'mosaico_reale', name: "Mosaico Reale",
        reqClay: 3, reqColors: { blue: 2, yellow: 2 },
        rewardMoney: 8, rewardPoints: 6
    }
];
