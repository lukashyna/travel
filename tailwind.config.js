/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F3743D',
                gray: '#939393',
                black: '#2C2C2C',
                white: '#FFFFFF',
            },
        },
    },
    plugins: [],
};
