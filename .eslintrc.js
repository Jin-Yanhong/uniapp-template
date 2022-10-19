module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:vue/vue3-essential', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignores: ['.eslintrc.js'],
    plugins: ['vue'],
    rules: {
        'indent': ['warn', 4],
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'max-len': ['warn', { code: 360 }],
        'linebreak-style': ['warn', 'windows'],
        'object-curly-spacing': ['warn', 'always'],
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
    },
};
