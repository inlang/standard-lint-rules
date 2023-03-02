import { createLintRule, type Context } from '@inlang/core/lint'

type Settings = {
	brand: string
	incorrect: string[]
}

function validateSettings(settings: Settings | undefined): asserts settings is Settings {
	if (!settings)
		throw new Error('You need to pass settings to configure this rule')

	if (!settings.brand)
		throw new Error("'brand' is required")

	if (!settings.incorrect?.length)
		throw new Error("'incorrect' needs to contain at least a single item")
}

export const brandingRule = createLintRule<Settings>(
	'inlang.brandingRule',
	'error',
	(settings) => {
		validateSettings(settings)
		const { brand, incorrect } = settings

		let context: Context

		return {
			setup: (args) => {
				context = args.context
			},
			visitors: {
				Pattern: ({ target }) => {
					if (!target) return

					const incorrectlyBrandedWords = target.elements
						.flatMap(element => incorrect.filter(word => element.value.includes(word)))

					for (const incorrectlyBrandedElement of incorrectlyBrandedWords) {
						context.report({
							node: target,
							message: `Element '${incorrectlyBrandedElement}' is incorrectly branded and should be replaced with '${brand}'`
						})
					}
				}
			},
		}
	})
