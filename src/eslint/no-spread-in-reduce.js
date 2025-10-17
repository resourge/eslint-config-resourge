// eslint-rules/no-spread-in-reduce.js
export default {
	create(context) {
		return {
			CallExpression(node) {
				// Detect reduce() calls
				if (
					node.callee.type === 'MemberExpression'
					&& node.callee.property.name === 'reduce'
				) {
					const callback = node.arguments[0];
					if (
						callback
						&& (callback.type === 'ArrowFunctionExpression'
							|| callback.type === 'FunctionExpression')
					) {
						// Walk callback body
						const body = callback.body.type === 'BlockStatement'
							? callback.body.body
							: [callback.body];

						for (const stmt of body) {
							// Look for SpreadElement inside array literals
							if (
								stmt.type === 'ReturnStatement'
								&& (
									stmt.argument?.type === 'ArrayExpression'
									|| stmt.argument?.type === 'ObjectExpression'
								)
								&& stmt.argument.elements.some((e) => e?.type === 'SpreadElement')
							) {
								context.report({
									messageId: 'noSpread',
									node: stmt.argument 
								});
							}
						}
					}
				}
			}
		};
	},
	meta: {
		docs: {
			description: 'disallow using the spread operator inside Array.reduce()'
		},
		messages: {
			noSpread: 'Avoid using spread (...) inside reduce — it creates a new array each iteration.'
		},
		schema: [],
		type: 'suggestion'
	}
};
