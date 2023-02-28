import { context } from 'esbuild'
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

const ctx = await context({
  entryPoints: ["src/index.ts"],
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