import { createLintRule, type Context } from '@inlang/core/lint'

export const additionalKeyRule = createLintRule(
	'inlang.additionalKey',
	'warn',
	() => {
		let context: Context
		let referenceLanguage: string

		return {
			setup: (args) => {
				context = args.context
				referenceLanguage = args.referenceLanguage
			},
			visitors: {
				Resource: ({ target }) => {
					if (target && target.languageTag.name === referenceLanguage) return 'skip'
				},
				Message: ({ target, reference }) => {
					if (!reference && target) {
						context.report({
							node: target,
							message: `Message with id '${target.id.name}' is specified, but missing in the reference`
						})
					}
				},
			},
		}
	})