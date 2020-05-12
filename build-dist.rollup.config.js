const rollup = require('rollup')
const { terser } = require('rollup-plugin-terser')
const babel = require('rollup-plugin-babel')
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
    babel({
      exclude: 'node_modules/**',
      presets: [["@babel/env", {modules: false}], "@babel/react"],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    }),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        VERSION: version
      }
    }),
    terser({output: {
      comments: '/Version/'
    }})
  ]
}, {
  file: `dist/dnd_iframe_autofit_child.js`,
  format: 'iife',
  name: 'dndIframeAutofitChild'
});

build({
  input: 'dist/templates/dnd_iframe_autofit_datawrapper.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [["@babel/env", {modules: false}], "@babel/react"],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    }),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        VERSION: version
      }
    }),
    terser({output: {
      comments: '/Version/'
    }})
  ]
}, {
  file: `dist/dnd_iframe_autofit_datawrapper.js`,
  format: 'iife',
  name: 'dndIframeAutofitDatawrapper'
});

build({
  input: 'dist/templates/dnd_iframe_autofit_parent.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [["@babel/env", {modules: false}], "@babel/react"],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    }),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        VERSION: version
      }
    }),
    terser({output: {
      comments: '/Version/'
    }})
  ]
}, {
  file: `dist/dnd_iframe_autofit_parent.js`,
  format: 'iife',
  name: 'dndIframeAutofitParent'
});

build({
  input: ['dist/20min/templates/default.js'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: [["@babel/env", {modules: false}], "@babel/react"],
      plugins: [
        "@babel/plugin-proposal-class-properties"
      ]
    }),
    replace({
      exclude: 'node_modules/**',
      delimiters: ['<@', '@>'],
      values: {
        VERSION: version
      }
    }),
    terser({output: {
      comments: '/Version/'
    }})
  ]
}, {
  dir: `dist/20min/`,
  format: 'iife',
});
