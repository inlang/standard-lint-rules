import * as _inlang_core_lint from '@inlang/core/lint';

declare const standardRulesCollection: _inlang_core_lint.RuleCollectionInitializer<{
    additionalKeyRule: _inlang_core_lint.LintRuleInitializer<never, false>;
    brandingRule: _inlang_core_lint.LintRuleInitializer<{
        brand: string;
        incorrect: string[];
    }, false>;
    missingKeyRule: _inlang_core_lint.LintRuleInitializer<never, false>;
}>;

export { standardRulesCollection };
