import { JSRuleDefinition } from "eslint";

const rule: JSRuleDefinition = {
	meta: {
		type: 'suggestion',
		docs: {
			description: 'disallow using the spread operator inside Array.reduce()',
		},
		messages: {
			noSpread:
				'Avoid using spread (...) inside reduce — it creates a new object/array each iteration.',
		},
		schema: [],
	},

	create(context) {
		return {
			CallExpression(node) {
				// Detect `.reduce(...)`
				if (
					node.callee.type === 'MemberExpression' &&
					node.callee.property.type === 'Identifier' &&
					node.callee.property.name === 'reduce'
				) {
					const callback = node.arguments[0];

					if (
						callback &&
						(callback.type === 'ArrowFunctionExpression' ||
							callback.type === 'FunctionExpression')
					) {
						const body =
							callback.body.type === 'BlockStatement'
								? callback.body.body
								: [callback.body];

						for (const stmt of body) {
							if (
								stmt.type === 'ReturnStatement' &&
								stmt.argument
							) {
								const arg = stmt.argument;

								// Array spread: [...acc]
								if (arg.type === 'ArrayExpression') {
									if (
										arg.elements.some(
											(e) => e?.type === 'SpreadElement'
										)
									) {
										context.report({
											node: arg,
											messageId: 'noSpread',
										});
									}
								}

								// Object spread: { ...acc }
								if (arg.type === 'ObjectExpression') {
									if (
										arg.properties.some(
											(p) =>
												p.type === 'SpreadElement'
										)
									) {
										context.report({
											node: arg,
											messageId: 'noSpread',
										});
									}
								}
							}
						}
					}
				}
			},
		};
	},
};

export default rule;