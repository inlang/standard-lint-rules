import { createLintRuleCollection } from '@inlang/core/lint'

import { additionalKeyRule } from './additionalKeyRule.js'
import { brandingRule } from './brandingRule.js'
import { missingKeyRule } from './missingKeyRule.js'

export const standardRulesCollection = createLintRuleCollection({
	additionalKeyRule,
	brandingRule,
	missingKeyRule,
})
