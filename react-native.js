const getReactConfig = require('./src/reactConfig');

module.exports = getReactConfig({
	recommended: [
		'@react-native'
	],
	rules: {
		'prettier/prettier': 0,
		'react-native/no-inline-styles': 0,
		'@typescript-eslint/no-shadow': 0
	}
});
