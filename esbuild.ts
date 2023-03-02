import { context } from 'esbuild'
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import { glob } from 'glob'

const entryPoints = await glob('src/*.ts', { ignore: '**/*.test.ts' })

const ctx = await context({
  entryPoints,
  outdir: "dist",
  bundle: true,
  minify: !process.env.DEV,
  format: "esm",
  platform: "browser",
  target: "es2020",
  plugins: [
    NodeModulesPolyfillPlugin(),
    {
      name: 'logger',
      setup: ({ onEnd }) => onEnd(() => console.info('🎉 changes processed'))
    }
  ],
});

if (process.env.DEV) {
  await ctx.watch()
  console.info('👀 watching for changes...')
  process.on('exit', async () => {
    console.info('🙈 process killed')
    await ctx.dispose()
  })
} else {
  await ctx.rebuild()
  console.info('✅ build complete')
  await ctx.dispose()
}

// TODO: should we wrap the build into a @inlang/core/utilities function to always have a consistent experience? e.g. log output, output folder, target, platform etc. Only entry points make sense to be defined individually. And maybe plugins.
// TODO: use `tsup` to also generate `.d.ts` files