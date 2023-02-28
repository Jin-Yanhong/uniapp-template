/* eslint-disable */
module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['vue'],
	ignorePatterns: ['vue.config.js', '.eslintrc.js'],
	rules: {
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'quotes': ['error', 'double'],
		'semi': ['error', 'always'],
	},
};
