# dnd-iframe-messaging

This is work in progress

Plugin based library to handle 2-way communication between an iframe and it's parent using MessageChannels and/or postMessage.

## Using this library

There are always two sides of communication between and iframe and its parent. The parent (usually webclient) has to provide every iframe with a unique ID and initializes the communication. The iframe will react to initialization by starting plugins that do something and then communicate back to the parent if needed.

## Autofit

The autofit functionality (iframe will communicate its actual height to it's parent so the parent can resize the iframe) is the first use case of the plugin system.

## Scripts needed by content in the iframe
All relevant code for the iframe side is in `src/child`. There is a rollup script (build-dist.rollup.config.js) which can be used to build a minified version of the child code.

Currently we build a script that includes the autofit plugin.

## Code needed by the parent (usually weblient)
All the relevant code for the parent is in `src/parent`. There is a also a react component in `src/parent/react/IFrameWithMessaging.jsx` which can be included in any react webclient or which can be used as an example to implement your own component.

There is a rollup script (build-npm.rollup.config.js) which prepares the code for the npm package.

## Building a new version of the code
To build a new version of the scripts needed on child side and to build a new npm package and publish it, use
`npm version <version_type>`
(version type is patch, minor or major)

The following steps are then executed:

1) The scripts for the child side are built (and minified) and copied to dist/

2) The src code is prepared (incl. transpilation) for the new npm package and copied to build/

3) The src is pushed and tagged in github with the new version

4) The new npm package is build and published to npmjs

## include the npm package in a webclient
To use the code in a webclient, do the following:
1) add the following line to .npmrc in your project:
`//registry.npmjs.org/:_authToken=ce3429cf-4822-4773-862b-139031fef4d6`

2 ) add it the package to package.json:
`npm install @dnd-it/dnd-iframe-messaging`

3) import the code needed, e.g.
`import { IFrameWithMessaging } from '@dnd-it/dnd-iframe-messaging'`

## Autofit backwards compatibility

The parent side of this code has been written in a way that it's backwards compatible with the existing autofit scripts that are out in the wild...

To enable the backward compatibility on the provided IFrameWithMessaging.jsx component, just set the prop `enableLegacySupport`.

