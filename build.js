const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const watch = process.argv.includes('--watch');

// Read CSS file and escape for JS
const cssContent = fs.readFileSync(path.join(__dirname, 'src/styles.css'), 'utf8');
const escapedCSS = JSON.stringify(cssContent);

// Create a virtual CSS module
const cssPlugin = {
  name: 'css-loader',
  setup(build) {
    build.onResolve({ filter: /^styles\.css$/ }, args => ({
      path: args.path,
      namespace: 'css-ns',
    }));

    build.onLoad({ filter: /.*/, namespace: 'css-ns' }, () => ({
      contents: `export default ${escapedCSS};`,
      loader: 'js',
    }));
  },
};

const baseConfig = {
  entryPoints: ['src/index.js'],
  bundle: true,
  plugins: [cssPlugin],
};

async function build() {
  // ESM build
  await esbuild.build({
    ...baseConfig,
    outfile: 'dist/christmas-mode.esm.js',
    format: 'esm',
    minify: true,
  });

  // CJS build
  await esbuild.build({
    ...baseConfig,
    outfile: 'dist/christmas-mode.cjs.js',
    format: 'cjs',
    minify: true,
  });

  // UMD/IIFE build for browsers
  await esbuild.build({
    ...baseConfig,
    outfile: 'dist/christmas-mode.umd.js',
    format: 'iife',
    globalName: 'ChristmasMode',
    minify: true,
  });

  // Copy TypeScript definitions
  fs.copyFileSync(
    path.join(__dirname, 'src/christmas-mode.d.ts'),
    path.join(__dirname, 'dist/christmas-mode.d.ts')
  );

  console.log('Build complete!');
}

async function watchBuild() {
  const ctx = await esbuild.context({
    ...baseConfig,
    outfile: 'dist/christmas-mode.esm.js',
    format: 'esm',
  });
  await ctx.watch();
  console.log('Watching for changes...');
}

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

if (watch) {
  watchBuild();
} else {
  build();
}
