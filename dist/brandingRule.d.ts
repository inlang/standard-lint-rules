import { LintRuleInitializer } from '@inlang/core/lint';

type Settings = {
    brand: string;
    incorrect: string[];
};
declare const brandingRule: LintRuleInitializer<Settings>;

export { brandingRule };
