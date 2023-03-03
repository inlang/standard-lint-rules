import { defineConfig } from 'tsup'
import { glob } from 'glob'
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"

export default defineConfig(async () => {
	const entryPoints = await glob('src/*.ts', { ignore: '**/*.test.ts' })

	return {
		entry: entryPoints,
		outDir: 'dist',
		bundle: false,
		minify: !process.env.DEV,
		format: 'esm',
		platform: 'node', // TODO: use 'neutral'
		target: 'es2020',
		dts: true,
		clean: true,
		plugins: [
			NodeModulesPolyfillPlugin(),
		]
	}
})