import config from './src/config.js';

export default defineConfig([
	config,
	{
		extends: [
			'@react-native'
		],
		rules: {
			'prettier/prettier': 0,
			'react-native/no-inline-styles': 0,
			'@typescript-eslint/no-shadow': 0
		}
	}
]);