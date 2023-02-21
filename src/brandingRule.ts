import { createRule, type Context } from '@inlang/core/lint'

export const brandingRule = createRule<({ brandName: string, incorrectBrandingNames: string[] })>(
	'inlang.brandingRule',
	'error',
	({ brandName, incorrectBrandingNames }) => {
		let context: Context

		return {
			initialize: (args) => {
				context = args.context
			},
			visitors: {
				Pattern: ({ target }) => {
					if (!target) return

					const incorrectlyBrandedWords = target.elements
						.flatMap(element => incorrectBrandingNames.filter(word => element.value.includes(word)))

					for (const incorrectlyBrandedElement of incorrectlyBrandedWords) {
						context.report({
							node: target,
							message: `Element '${incorrectlyBrandedElement}' is incorrectly branded and should be replaced with '${brandName}'`
						})
					}
				}
			},
		}
	})
