# dnd-iframe-messaging

Plugin based library to handle 2-way communication between an iframe and it's parent using [MessageChannels](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) and/or [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).


There are always two sides of communication between an iframe and its parent. The parent (either [DISCO] or [20min-frontend]) has to provide every iframe with a unique ID and initialize the communication. The iframe will react to initialization by starting plugins that do something and then communicate back to the parent if needed.

[DISCO]: https://github.com/DND-IT/disco/
[20min-frontend]: https://github.com/DND-IT/20min-frontend/


## Use-cases

### Autofit

The autofit functionality (iframe will communicate its actual height to it's parent so the parent can resize the iframe) is the first use-case of the plugin system.

The parent side of this code has been written in a way that it's backwards compatible with the existing autofit scripts that are out in the wild. See e.g. `enableLegacySupport` in [`useIframeMessaging ` in the disco code](https://github.com/DND-IT/disco/blob/master/src/hooks/useIframeMessaging.ts#L28).

### Dark-mode

If the parent page has a dark-mode toggle that the user can set to something else than the [system-default](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme), then we should propagate that setting to the child frames. We could add this as the second use-case of this library, by adding a new plugin to the [child script](https://github.com/DND-IT/dnd-iframe-messaging/tree/master/src/child). But in the end, it's really only the following code that the child frame needs to implement:

```js
window.addEventListener('message', event => {
  if (event.origin === "https://www.tagesanzeiger.ch") {
    // this check is needed because of https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage#security_concerns
    if (event.data.type === 'colorMode') {
      // assuming you have a function setColorModeInChildApp in your app
      setColorModeInChildApp(event.data.mode) // will be the string 'dark' or 'light'
    }
  }
})
```

## Code

### Child scripts (for the content of the iframe)

All relevant code for the iframe side is in `src/child/`. There is a rollup script (`./build-dist.rollup.config.js`) which can be used to build a minified version of the child code.

Currently, we build a script that includes the autofit plugin. This is availlable under:

- https://files.publishing.tamedia.ch/_static/dnd_iframe_autofit_child.js (beware that this is sometimes blocked by adblockers, as it's under a different domain than the parent page)
- each tenant, for example: https://www.tagesanzeiger.ch/_static/dnd_iframe_autofit_child.js

These are hosted in the [disco public folder].

[disco public folder]: https://github.com/DND-IT/disco/tree/master/src/public/_static.

### Parent scripts (for [DISCO] or [20min-frontend])

All the relevant code for the parent is in `src/parent/`.

There is a rollup script (`./build-npm.rollup.config.js`) which prepares the code for the npm package.

To use the code, do the following:

1. add the following line to `.npmrc` in your project:

       //registry.npmjs.org/:_authToken=ce3429cf-4822-4773-862b-139031fef4d6

2. add it the package to `package.json`:

       npm install @dnd-it/dnd-iframe-messaging

3. import the code needed, e.g.

   ```js
   import { init, register, unregister } from '@dnd-it/dnd-iframe-messaging/parent'
   ```


## Building and releasing a new version

To build a new version of the scripts needed on child side and to build a new npm package and publish it, use
`npm version <version_type>`
(use [semver](https://semver.org/))

The following steps are then executed:

1) The scripts for the child side are built (and minified) and copied to `./dist/`

2) The src code is prepared (incl. transpilation) for the new npm package and copied to `./build/`

3) The src is pushed and tagged in GitHub with the new version

4) The new npm package is built and published to [npmjs.com](https://www.npmjs.com/package/@dnd-it/dnd-iframe-messaging).

If the child-scripts need to be released, you need to manually update them in the [disco public folder].
