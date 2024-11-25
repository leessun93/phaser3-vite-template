module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true, // Node.js 환경 추가
	},
	extends: 'eslint:recommended',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {},
}
