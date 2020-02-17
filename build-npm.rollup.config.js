const rollup = require('rollup')
const replace = require('rollup-plugin-replace')
const del = require('del')
const babel = require('rollup-plugin-babel')
const fsPromises = require('fs').promises

const { version } = require('./package.json')

async function build (inputOptions, outputOptions) {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);
  // generate code
  await bundle.generate(outputOptions);
  // or write the bundle to disk
  await bundle.write(outputOptions);
}

async function initBuildDir() {
  console.log(`Cleaning up any previously generated files in build directory`)
  await del(['build'])
  await fsPromises.mkdir('./build')
  await fsPromises.copyFile('package.json', 'build/package.json')
}

initBuildDir().then(async () => {
  console.log(`preparing files for npm package ${version}`)
  await build({
    input: 'src/index.js',
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
      })
    ]
  }, {
    file: 'build/index.js',
    format: 'umd',
    name: 'dndIframeMessaging'
  });

  await build({
    input: 'src/index.js',
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
      })
    ]
  }, {
    file: 'build/esm.js',
    format: 'esm',
    name: 'dndIframeMessaging'
  })
})
