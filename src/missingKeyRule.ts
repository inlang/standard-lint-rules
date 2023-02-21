import { createRule, type Context } from '@inlang/core/lint'

export const missingKeyRule = createRule(
	'inlang.missingKey',
	'error',
	() => {
		let context: Context
		let referenceLanguage: string

		return {
			initialize: (args) => {
				context = args.context
				referenceLanguage = args.referenceLanguage
			},
			visitors: {
				Resource: ({ target }) => {
					if (target && target.languageTag.name === referenceLanguage) return 'skip'
				},
				Message: ({ target, reference }) => {
					if (!target && reference) {
						context.report({
							node: reference,
							message: `Message with id '${reference.id.name}' missing`
						})
					}
				}
			},
		}
	})