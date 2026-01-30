/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'vietri-blue': '#0047AB',
                'vietri-yellow': '#FFD700',
                'clay-grey': '#A9A9A9',
                'terracotta': '#E2725B',
            },
            fontFamily: {
                'serif': ['Georgia', 'serif'],
                'sans': ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
            },
            backgroundImage: {
                'grid-pattern': 'radial-gradient(#e6f2ff 1px, transparent 1px)',
            }
        },
    },
    plugins: [],
}
