// Migrate built-in rules to @stylistic/js namespace
/* eslint @stylistic/migrate/migrate-js: "error" */

// Migrate `@typescript-eslint` rules to @stylistic/ts namespace
/* eslint @stylistic/migrate/migrate-ts: "error" */


module.exports = function getConfig({
	recommended = [],
	plugins = [],
	overrides = [],
	rules = [],
	settings = {}
}) {
	const isProduction = process.env.NODE_ENV === 'production';
	return {
		env: {
			browser: true,
			es2021: true
		},
		extends: [
			'standard-with-typescript',
			'plugin:jsx-a11y/recommended',
			'plugin:@stylistic/recommended-extends',
			...recommended
		],
		ignorePatterns: ['**/dist/*', '**/build/*', './main.js'],
		parser: '@typescript-eslint/parser',
		parserOptions: {
			project: './tsconfig.json',
			ecmaFeatures: {
				jsx: true
			},
			ecmaVersion: 'latest',
			sourceType: 'module'
		},
		plugins: [
			'@typescript-eslint',
			'typescript-sort-keys',
			'import-newlines',
			'jsx-a11y',
			'@stylistic',
			'unicorn',
			...plugins
		],
		overrides: [
			{
				files: ['*.ts', '*.tsx', '*.js'], // Your TypeScript files extension
				parserOptions: {
					project: ['./tsconfig.json'] // Specify it only for TypeScript files
				}
			},
			{
				files: ['vite.config.ts', './scripts/*'], // Your TypeScript files extension
				parserOptions: {
					project: ['./tsconfig.node.json'] // Specify it only for TypeScript files
				}
			},
			...overrides
		],
		rules: {
			'@typescript-eslint/consistent-type-assertions': 0,
			'no-return-assign': 'off',
			'operator-linebreak': 'off',
			'key-spacing': 'off',
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/key-spacing': ['error', {
				beforeColon: false,
				afterColon: true
			}],
			'no-lonely-if': 'error',
			'no-dupe-else-if': 'error',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'ts-expect-error': 'allow-with-description',
					'ts-ignore': false,
					'ts-nocheck': false,
					'ts-check': false,
					minimumDescriptionLength: 3
				}
			],
			'typescript-sort-keys/interface': [
				'error',
				'asc',
				{
					caseSensitive: false,
					natural: true,
					requiredFirst: true
				}
			],
			'newline-per-chained-call': 'off',
			'object-property-newline': 'off',
			'object-curly-newline': 'off',
			'@stylistic/newline-per-chained-call': ['error', {
				ignoreChainWithDepth: 2
			}],
			'@stylistic/object-property-newline': ['error', {
				allowAllPropertiesOnSameLine: false
			}],
			'@stylistic/object-curly-newline': ['error', {
				ObjectExpression: {
					minProperties: 1,
					multiline: true
				},
				ObjectPattern: {
					minProperties: 3,
					multiline: true
				},
				ExportDeclaration: {
					multiline: true,
					minProperties: 3
				}
			}],
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'import/no-anonymous-default-export': 'off',
			'import-newlines/enforce': [
				'error',
				{
					items: 3,
					semi: false,
					forceSingleLine: true
				}
			],
			'comma-dangle': 'off',
			'@stylistic/comma-dangle': ['error', 'never'],
			'require-await': 'off',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/triple-slash-reference': ['error', {
				path: 'never',
				types: 'always',
				lib: 'never'
			}],
			'@stylistic/jsx-indent': ['error', 'tab'],
			'@stylistic/jsx-indent-props': ['error', 'tab'],
			indent: 0,
			'@typescript-eslint/indent': 0,
			'@stylistic/indent': ['error', 'tab', {
				MemberExpression: 0,
				SwitchCase: 1,
				ignoredNodes: ['TSTypeParameterInstantiation']
			}],
			'@stylistic/indent-binary-ops': ['error', 'tab'],
			'no-tabs': 'off',
			'@stylistic/no-tabs': 'off',
			'no-await-in-loop': ['error'],
			'brace-style': 'off',
			'@typescript-eslint/brace-style': 'off',
			'@stylistic/brace-style': ['error', 'stroustrup'],
			'@typescript-eslint/strict-boolean-expressions': 0,
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 0,
			'@typescript-eslint/explicit-function-return-type': 0,
			'space-before-function-paren': 'off',
			'@typescript-eslint/space-before-function-paren': 0,
			'@stylistic/space-before-function-paren': 0,
			'consistent-type-definitions': 'off',
			'@typescript-eslint/consistent-type-definitions': 'off',
			'@stylistic/space-in-parens': 'off',
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/no-trailing-spaces': 'off',
			'space-in-parens': 'off',
			semi: 'off',
			'@typescript-eslint/semi': 'off',
			'no-trailing-spaces': 'off',
			'@typescript-eslint/prefer-optional-chain': 'off',
			'no-case-declarations': 'off',
			'@typescript-eslint/promise-function-async': 'off',
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'no-console': isProduction ? 'error' : 'off',
			'no-empty-pattern': isProduction ? 'error' : 'warn',
			'@typescript-eslint/no-unused-vars': isProduction ? 'error' : 'warn',
			'prefer-promise-reject-errors': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'multiline-ternary': 'off',
			'@stylistic/multiline-ternary': 'off',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksConditionals: false,
					checksVoidReturn: false
				}
			],
			'@stylistic/quote-props': ['error', 'as-needed'],
			'@stylistic/type-generic-spacing': ['error'],
			'@stylistic/type-named-tuple-spacing': ['error'],
			'import/order': ['error', {
				groups: [
					['builtin', 'external'],
					'internal',
					'parent',
					'sibling',
					'index',
					'object'
				],
				pathGroups: [
					{
						pattern: 'react+(|-native)',
						group: 'external',
						position: 'before'
					}
				],
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: false
				}
			}],

			'@typescrip-eslint/brace-style': 'off',
			'unicorn/prefer-at': [
				'error'
			],
			'unicorn/prefer-array-find': ['error'],
			'unicorn/prefer-array-some': ['error'],
			'unicorn/no-invalid-remove-event-listener': ['error'],
			...rules
		},
		settings: {
			'import/internal-regex': ['src/'],
			...settings
		}
	}
};
