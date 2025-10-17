import js from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import noSpreadInReduce from './src/eslint/no-spread-in-reduce.js';

const isProduction = process.env.NODE_ENV === 'production';
const ignoreList = ['dist', 'build', 'node_modules'];

export default defineConfig([
	globalIgnores(ignoreList),
	{
		files: ['**/index.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
		ignores: ignoreList,
		rules: {
			'no-restricted-syntax': [
				'error',
				{
					message: 'Avoid using index — use a descriptive filename instead.',
					selector: 'Program'
				}
			]
		}
	},
	{
		extends: [
			js.configs.recommended,
			tseslint.configs.recommendedTypeChecked,
			reactHooks.configs.flat['recommended-latest'],
			reactRefresh.configs.vite,
			perfectionist.configs['recommended-natural'],
			stylistic.configs.recommended,
			jsxA11y.flatConfigs.recommended,
			unicorn.configs.recommended
		],
		files: ['./src/**/*.{js,ts,tsx}', 'eslint.config.js'],
		ignores: ignoreList,
		languageOptions: {
			ecmaVersion: 202,
			globals: {
				...globals.serviceworker,
				...globals.browser
			},
			parserOptions: {
				...react.configs.flat['jsx-runtime'].languageOptions,
				projectService: true
			}
		},
		plugins: { 
			custom: { 
				rules: { 
					'no-spread-in-reduce': noSpreadInReduce 
				} 
			},
			react 
		},
		rules: {
			'@stylistic/arrow-parens': ['error', 'always'],
			'@stylistic/brace-style': ['error', 'stroustrup'],
			'@stylistic/comma-dangle': ['error', 'never'],
			'@stylistic/indent': ['error', 'tab', {
				ignoredNodes: ['TSTypeParameterInstantiation'],
				MemberExpression: 0,
				SwitchCase: 1
			}],
			'@stylistic/indent-binary-ops': ['error', 'tab'],
			'@stylistic/jsx-closing-bracket-location': ['error', 'line-aligned'],
			'@stylistic/jsx-closing-tag-location': ['error', 'tag-aligned'],
			'@stylistic/jsx-curly-brace-presence': ['error', {
				children: 'never',
				props: 'always'
			}],
			'@stylistic/jsx-curly-newline': ['error', {
				multiline: 'consistent',
				singleline: 'forbid'
			}],
			'@stylistic/jsx-curly-spacing': ['error', {
				children: {
					when: 'always'
				},
				when: 'never'
			}],
			'@stylistic/jsx-indent': 0,
			'@stylistic/jsx-indent-props': ['error', 'tab'],
			'@stylistic/jsx-max-props-per-line': ['error', {
				maximum: 1,
				when: 'multiline'
			}],
			'@stylistic/jsx-one-expression-per-line': ['error', {
				allow: 'non-jsx'
			}],
			'@stylistic/jsx-self-closing-comp': ['error', {
				component: true,
				html: true
			}],
			'@stylistic/jsx-tag-spacing': ['error', {
				beforeClosing: 'proportional-always',
				beforeSelfClosing: 'proportional-always'
			}],
			'@stylistic/jsx-wrap-multilines': ['error', {
				arrow: 'parens-new-line',
				assignment: 'parens-new-line',
				condition: 'parens-new-line',
				declaration: 'parens-new-line',
				logical: 'parens-new-line',
				prop: 'parens-new-line',
				propertyValue: 'parens-new-line',
				return: 'parens-new-line'
			}],
			'@stylistic/max-statements-per-line': 'off',
			'@stylistic/multiline-ternary': ['error', 'always', {
				ignoreJSX: false
			}],
			'@stylistic/newline-per-chained-call': ['error', {
				ignoreChainWithDepth: 2
			}],
			'@stylistic/no-confusing-arrow': 'error',
			'@stylistic/no-tabs': 'off',
			'@stylistic/no-trailing-spaces': 'off',
			'@stylistic/object-curly-newline': ['error', {
				ExportDeclaration: {
					minProperties: 3,
					multiline: true
				},
				ObjectExpression: {
					minProperties: 1,
					multiline: true
				},
				ObjectPattern: {
					minProperties: 3,
					multiline: true
				}
			}],
			'@stylistic/object-property-newline': ['error', {
				allowAllPropertiesOnSameLine: false
			}],
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/padded-blocks': ['error', 'never'],
			'@stylistic/semi': ['error', 'always'],
			'@stylistic/space-before-function-paren': 'off',
			'@stylistic/space-in-parens': 'off',

			'@typescript-eslint/adjacent-overload-signatures': 'off',
			'@typescript-eslint/ban-ts-comment': [
				'error',
				{
					'minimumDescriptionLength': 3,
					'ts-check': false,
					'ts-expect-error': 'allow-with-description',
					'ts-ignore': false,
					'ts-nocheck': false
				}
			],
			'@typescript-eslint/ban-types': 'off',
			'@typescript-eslint/consistent-type-assertions': 'off',
			'@typescript-eslint/explicit-function-return-type': 'off',
			'@typescript-eslint/member-ordering': 'error',
			'@typescript-eslint/no-confusing-void-expression': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-extraneous-class': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksConditionals: false,
					checksVoidReturn: false
				}
			],
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-unused-vars': isProduction
				? 'error'
				: 'warn',
			'@typescript-eslint/prefer-nullish-coalescing': ['error', {
				ignoreConditionalTests: true
			}],
			'@typescript-eslint/prefer-optional-chain': 'off',
			'@typescript-eslint/promise-function-async': 'off',
			'@typescript-eslint/require-await': 'error',
			'@typescript-eslint/strict-boolean-expressions': 'off',
			'@typescript-eslint/triple-slash-reference': ['error', {
				lib: 'never',
				path: 'never',
				types: 'always'
			}],
			'@typescript-eslint/unbound-method': 'off',

			'curly': ['error', 'all'],
			'custom/no-spread-in-reduce': 'error',
			'key-spacing': 'off',
			'max-params': ['error', {
				countVoidThis: false,
				max: 4 
			}],
			'no-await-in-loop': ['error'],
			'no-case-declarations': 'off',
			'no-console': isProduction
				? 'error'
				: 'off',
			'no-dupe-else-if': 'error',
			'no-empty-pattern': isProduction
				? 'error'
				: 'warn',
			'no-lonely-if': 'error',
			'no-return-assign': 'off',
			'operator-linebreak': 'off',
			'prefer-promise-reject-errors': 'off',

			'react-hooks/exhaustive-deps': 'off',

			'react/jsx-no-leaked-render': ['error', {
				validStrategies: ['ternary']
			}],
			'react/no-unstable-nested-components': 'off',
			'react/prop-types': 'off',
			'require-await': 'off',
			'unicorn/filename-case': [
				'error',
				{
					case: 'pascalCase',
					ignore: [
						'main.tsx',
						'.ts$',
						'eslint.config.js'
					]
				}
			],
			'unicorn/no-array-for-each': 'off',
			'unicorn/no-array-reduce': 'off',
			'unicorn/no-array-reverse': 'off',
			'unicorn/no-array-sort': 'off',
			'unicorn/no-for-loop': 'off',
			'unicorn/no-invalid-remove-event-listener': ['error'],
			'unicorn/prefer-array-find': ['error'],

			'unicorn/prefer-array-some': ['error'],
			'unicorn/prefer-at': [
				'error'
			],
			'unicorn/prefer-spread': 'off',

			'unicorn/prevent-abbreviations': 'off'
		}
	}
]);
