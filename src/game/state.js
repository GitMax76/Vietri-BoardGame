import { COMMISSIONS } from './constants';

export const gameState = {
    // Resources
    coins: 5,
    clay: 0,
    pigments: { red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0 },

    // Workers
    assistants: 3,
    assistantsStatus: [false, false, false], // true = used
    selectedMeepleIndex: null,

    // Progression
    score: 0,
    currentObjective: COMMISSIONS[0],

    // Lathe State
    wheelUnlocked: false,

    // Inner Wheel (3 Slots) - Holds Clay amount
    // Each slot: { clay: 0 }
    innerSlots: [
        { clay: 0 },
        { clay: 0 },
        { clay: 0 }
    ],
    innerRotationIndex: 0, // 0-2 (Which slot is at Top?)

    // Outer Wheel (6 Slots) - Holds Pigments
    // Each slot: { red: 0, blue: 0 ... }
    outerSlots: Array(6).fill(null).map(() => ({
        red: 0, blue: 0, yellow: 0, green: 0, orange: 0, purple: 0
    })),
    outerRotationIndex: 0, // 0-5 (Which slot is at Top?)

    // Tutorial
    tutorialStep: 1,

    // Methods to mutate state (simple pattern)
    resetDaily() {
        this.assistantsStatus = [false, false, false];
        this.selectedMeepleIndex = null;
        this.wheelUnlocked = false;
        // Do we reset wheel content? No, user built it.
    },

    getTopInnerSlot() {
        // Index 0 is visual top? Or rotation shifts it?
        // Let's say rotation shifts the index.
        return this.innerSlots[this.innerRotationIndex];
    },

    getTopOuterSlot() {
        return this.outerSlots[this.outerRotationIndex];
    }
};
