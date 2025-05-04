// build-cjs.js
const esbuild = require('esbuild');
const pnpPlugin = require('@yarnpkg/esbuild-plugin-pnp');

esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/index.cjs',
  plugins: [pnpPlugin.pnpPlugin()]
}).catch(() => process.exit(1));