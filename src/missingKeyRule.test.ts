import { describe, expect, test, vi } from 'vitest'
import { missingKeyRule } from './missingKeyRule.js'
import { hasLintReports, getLintReports } from '@inlang/core/lint'
import { lint, createResource, createMessage } from './test.utils.js'

describe('missingKeyRule', () => {
	describe('lint level', () => {
		test("default should be 'error'", () => {
			const rule = missingKeyRule()
			expect(rule.level).toBe('error')
		})

		test("should allow to change lint level", () => {
			const rule = missingKeyRule('warn')
			expect(rule.level).toBe('warn')
		})
	})

	describe("visitors", () => {
		test("should not process nodes of the reference language", async () => {
			const rule = missingKeyRule()

			const lintedResources = await lint(rule, [createResource('en', createMessage('test', '1'))])

			expect(rule.visitors.Resource).toHaveBeenCalledOnce()
			expect(rule.visitors.Message).not.toHaveBeenCalled()
			// TODO: allow `hasLintReports` to be called with an array of resources
			lintedResources?.forEach((resource) => expect(hasLintReports(resource)).toBe(false))
		})

		test("should process all nodes of the target language", async () => {
			const rule = missingKeyRule()

			const lintedResources = await lint(rule, [
				createResource('en'),
				createResource('de',
					createMessage('test', '1'),
					createMessage('test2', '2'),
					createMessage('test3', '3'),
				),
				createResource('fr',
					createMessage('test', '1'),
				),
			])

			expect(rule.visitors.Resource).toHaveBeenCalledTimes(3)
			expect(rule.visitors.Message).toHaveBeenCalledTimes(4)
			lintedResources?.forEach((resource) => expect(hasLintReports(resource)).toBe(false))
		})
	})

	describe("reports", () => {
		test("should report if key is missing", async () => {
			const rule = missingKeyRule()

			const lintedResources = await lint(rule, [
				createResource('en', createMessage('test', '1')),
				createResource('de'),
				createResource('fr',
					createMessage('test', '1'),
				),
			])

			const reports = lintedResources?.flatMap((resource) => getLintReports(resource)) || []
			expect(reports).toHaveLength(1)
			expect(reports[0].message).toBe("Message with id 'test' missing")
		})
	})
})
