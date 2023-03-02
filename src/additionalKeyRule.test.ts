import { describe, expect, test, vi } from 'vitest'
import { additionalKeyRule } from './additionalKeyRule.js'
import { hasLintReports, getLintReports } from '@inlang/core/lint'
import { doLint, createResource, createMessage } from './test.utils.js'

describe('additionalKeyRule', () => {
	describe('lint level', () => {
		test("default should be 'warn'", () => {
			const rule = additionalKeyRule()
			expect(rule.level).toBe('warn')
		})

		test("should allow to change lint level", () => {
			const rule = additionalKeyRule('error')
			expect(rule.level).toBe('error')
		})
	})

	describe("visitors", () => {
		test("should not process nodes of the reference language", async () => {
			const rule = additionalKeyRule()

			const lintedResources = await doLint(rule, [createResource('en', createMessage('test', '1'))])

			expect(rule.visitors.Resource).toHaveBeenCalledOnce()
			expect(rule.visitors.Message).not.toHaveBeenCalled()
			// TODO: allow `hasLintReports` to be called with an array of resources
			lintedResources?.forEach((resource) => expect(hasLintReports(resource)).toBe(false))
		})

		test("should process all nodes of the target language", async () => {
			const rule = additionalKeyRule()

			const lintedResources = await doLint(rule, [
				createResource('en', createMessage('test', '1')),
				createResource('de'),
				createResource('fr',
					createMessage('test', '1'),
				),
			])

			expect(rule.visitors.Resource).toHaveBeenCalledTimes(3)
			expect(rule.visitors.Message).toHaveBeenCalledTimes(2)
			lintedResources?.forEach((resource) => expect(hasLintReports(resource)).toBe(false))
		})
	})

	describe("reports", () => {
		test("should report if key is missing", async () => {
			const rule = additionalKeyRule()

			const lintedResources = await doLint(rule, [
				createResource('en', createMessage('test', '1')),
				createResource('de',
					createMessage('test', '1'),
				),
				createResource('fr',
					createMessage('test', '1'),
					createMessage('test2', '2'),
				),
			])

			const reports = lintedResources?.flatMap((resource) => getLintReports(resource)) || []
			expect(reports).toHaveLength(1)
			expect(reports[0].message).toBe("Message with id 'test2' is specified, but missing in the reference")
		})
	})
})
