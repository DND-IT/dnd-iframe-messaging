const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const del = require('del')

const { version } = require('./package.json')

async function build (inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  // generate code
  const { output } = await bundle.generate(outputOptions);
  // or write the bundle to disk
  await bundle.write(outputOptions);
}

async function cleanUp () {
  console.log(`Cleaning up any previously generated files for version ${version}`)
  await del([`dist/${version}`])
}

cleanUp()

console.log(`Building all files for ${version}`)
build({
  input: 'build/dnd_iframe_autofit_child.js',
  plugins: [
    terser()
  ]
}, {
  file: `dist/${version}/dnd_iframe_autofit_child.js`,
  format: 'iife',
  name: 'iframeWithAutofitChild'
});