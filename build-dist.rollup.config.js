const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const replace = require('rollup-plugin-replace')
const del = require('del')

const { version } = require('./package.json')

async function build (inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  // generate code
  await bundle.generate(outputOptions);
  // or write the bundle to disk
  await bundle.write(outputOptions);
}

async function cleanUp () {
  console.log(`Cleaning up any previously generated files for version ${version}`)
  await del([`dist/.*`])
}

cleanUp()

console.log(`Building all files for ${version}`)
build({
  input: 'dist/templates/dnd_iframe_autofit_child.js',
  plugins: [
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        VERSION: version
      }
    }),
    terser({output: {
      comments: 'all'
    }})
  ]
}, {
  file: `dist/dnd_iframe_autofit_child.js`,
  format: 'iife',
  name: 'dndIframeAutofitChild'
});