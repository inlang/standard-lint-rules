import { describe, expect, test } from 'vitest'
import { brandingRule } from './brandingRule.js'
import { getLintReports } from '@inlang/core/lint'
import { createMessage, createResource, lint } from '@inlang/core/lint/test-utilities'

describe('brandingRule', () => {
	const settings = { brand: 'my-brand', incorrect: ['myBrand'] }

	describe('lint level', () => {
		test("default should be 'error'", () => {
			const rule = brandingRule(true, settings)
			expect(rule.level).toBe('error')
		})

		test("should allow to change lint level", () => {
			const rule = brandingRule('warn', settings)
			expect(rule.level).toBe('warn')
		})

		test("should throw when no settings object get's passed", () => {
			expect(() => brandingRule('warn')).toThrow()
		})

		test("should throw when 'brand' does not get passed", () => {
			expect(() => brandingRule('warn', { incorrect: ['myBrand'] } as Parameters<typeof brandingRule>[1])).toThrow()
		})

		test("should throw when 'incorrect' does not get passed", () => {
			expect(() => brandingRule('warn', { brand: 'my-brand' } as Parameters<typeof brandingRule>[1])).toThrow()
		})

		test("should throw when 'incorrect' does not contain any items", () => {
			expect(() => brandingRule('warn', { brand: 'my-brand', incorrect: [] } as Parameters<typeof brandingRule>[1])).toThrow()
		})
	})

	describe("reports", () => {
		test("should report incorrect names", async () => {
			const rule = brandingRule(true, settings)

			const lintedResources = await lint(rule, [
				createResource('en',
					createMessage('test', 'This is a message about myBrand'),
					createMessage('test2', 'it is called my-brand!'),
					createMessage('test3', 'and not mybrand. Doy you get it?'),
					createMessage('test', 'sure'),
				),
				createResource('de',
					createMessage('test', 'myBrand'),
				),
			])

			const reports = lintedResources?.flatMap((resource) => getLintReports(resource)) || []
			expect(reports).toHaveLength(3)
		})

		test("should report case insensitive", async () => {
			const rule = brandingRule(true, settings)

			const lintedResources = await lint(rule, [
				createResource('en',
					createMessage('test', 'myBRAND'),
					createMessage('test2', 'MyBrand'),
					createMessage('test3', 'My-Brand'),
				),
			])

			const reports = lintedResources?.flatMap((resource) => getLintReports(resource)) || []
			expect(reports).toHaveLength(3)
		})

		test("should report multiple times if written wrong in a single sentence", async () => {
			const rule = brandingRule(true, settings)

			const lintedResources = await lint(rule, [
				createResource('en',
					createMessage('test', 'myBRAND mybrand test my-brand My-brand MYBRAND'),
				),
			])

			const reports = lintedResources?.flatMap((resource) => getLintReports(resource)) || []
			expect(reports).toHaveLength(4)
		})
	})
})
new RegExp('test', 'i')