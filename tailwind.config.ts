
export default {
    darkMode: ['class'],
    content: ['./client/index.html', './client/src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require('daisyui'), require('tailwindcss-animate')],
    daisyui: {
        themes: ['light', 'dark'],
    },
}
