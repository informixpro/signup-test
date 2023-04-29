import FormKitVariants from '@formkit/themes/tailwindcss'

module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts}',
        './formkit.config.ts',
    ],
    theme: {
        extend: {
            fontFamily: {
                primary: ['Roboto', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
            },
        },
    },
    plugins: [
        FormKitVariants
    ],
}
