import { createLintRule, type LintRuleInitializer, type Context } from '@inlang/core/lint'

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

// TODO: what about multiple brands?
// Currently you can use multiple instances of the same rule
// But once we check for duplicates in the lint ids, this would no longer be possible
export const brandingRule: LintRuleInitializer<Settings> = createLintRule(
	'inlang.brandingRule',
	'error',
	(settings) => {
		validateSettings(settings)
		const { brand, incorrect } = settings

		const regexps = Array.from( // remove duplicates
			new Set([brand, ...incorrect].map((item) => item.toLowerCase())) // lowercase all words to be consistent
		).map(item => new RegExp(item, 'ig')) // ignore casing of word

		let context: Context

		return {
			setup: (args) => {
				context = args.context
			},
			visitors: {
				Pattern: ({ target }) => {
					if (!target) return

					const incorrectlyBrandedWords = regexps
						.flatMap(regex => target.elements.flatMap(element => element.value.match(regex))
							.filter(Boolean) // filter out non-matching elements
							.filter(item => item !== brand) // ignore brand if spelled correctly
						)

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
