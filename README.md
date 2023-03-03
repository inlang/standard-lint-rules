# inlang standard-lint-rules

Those are the official inlang lint rules. Read more about inlang's lint system [here](https://inlang.com/documentation/lint).

## Lint rules

 - [missingKeyRule](#missingkeyrule)
 - [brandingRule](#brandingrule)
 - [additionalKeyRule](#additionalkeyrule)
 - [collection](#collection)

You can add any rule to the config like this:

_inlang.config.js_
```ts
export async function defineConfig(env) {
  return {
    referenceLanguage: "en",
    languages: ["en", "de", "fr"],
	 lint: {
		rules: [
			// add your rules here
		]
	 }
  };
}
```

Here are all the rules `standard-lint-rules` provides:

### missingKeyRule

**Checks if a target resource is missing a key present in the reference.**

This lint rule does not accept any settings.

_inlang.config.js_
```ts
// import
import { missingKeyRule } from '@inlang/standard-lint-rules'

// usage
lint: {
	rules: [
		missingKeyRule(),
	]
}
```

### brandingRule

**Checks if a brand name or any other word is written in a consistent way.**

This rule requires a settings object with the following properties:
 - `brand`: the correctly spelled word
 - `incorrect`: a list of incorrect versions of the `brand` that should trigger a lint report

This rule will look for `incorrect` words in all messages. It will do so in a case insensitive way, so `'myBrand'` and `mybrand` will be triggered when `MyBrand` is specified.

_inlang.config.js_
```ts
// import
import { brandingRule } from '@inlang/standard-lint-rules'

// usage
lint: {
	rules: [
		brandingRule(true, { brand: 'MyCompany', incorrect: ['my-company', 'my company'] }),
	]
}
```

### additionalKeyRule

**Checks if a reference resource has a key present that is not specified in the reference.**

This lint rule does not accept any settings.

_inlang.config.js_
```ts
// import
import { additionalKeyRule } from '@inlang/standard-lint-rules'

// usage
lint: {
	rules: [
		additionalKeyRule(),
	]
}
```

### collection

All rules above can also be added using the provided rule collection.

_inlang.config.js_
```ts
// import
import standardLintRules from '@inlang/standard-lint-rules'

// usage
lint: {
	rules: [
		standardLintRules({
			missingKeyRule: false,
			brandingRule: [true, { brand: 'MyCompany', incorrect: ['my-company', 'my company'] }]
			additionalKeyRule: 'error'
		}),
	]
}
```

---

Is something missing? Feel free to create a PR or add a comment [in the discussion thread](https://github.com/inlang/inlang/discussions/406).