# dnd-message-channel

This is work in progress

Plugin based library to handle 2-way communication between an iframe and it's parent using MessageChannels and/or postMessage.

## Using this library

There are always two sides of communication between and iframe and its parent. The parent (usually webclient) has to provide every iframe with a unique ID and initializes the communication. The iframe will react to initialization by starting plugins that do something and then communicate back to the parent if needed.

### Autofit

The autofit functionality (iframe will communicate its actual height to it's parent so the parent can resize the iframe) is the first use case of the plugin system.

### Scripts needed by content in the iframe
All relevant code for the iframe side is in `src/child`. There is a rollup script which builds a minified version of the child code.

#### Building the script for the iframe
The script is built by executing `npm run build`. This generates a minified version of the the relevant src code and saves it to `dist/<version>`.

Currently we build a script that includes the autofit plugin.

### Code needed by the parent (usually weblient)
All the relevant code for the parent is in `src/parent`. There is a also a react component in `src/parent/react/IFrameWithMessaging.jsx` which can be included in any react webclient or which can be used as an example to implement your own component.

#### Building an npm package for the parent (webclient)
The code in `src/parent` is packaged as an npm-package and deployed to our artifactory repo. So it can installed as devDependency in any project that acts as the "parent".

### Autofit backwards compatibility

This parent side of this code has been written in a way that it's backwards compatible with the existing autofit scripts that are out in the wild...


## Road Map

### Version 1.0
- Support ID based global handler (Deprecated)
- Support MessageChannel API

### Version 2.0
- Remove ID based global handler

## Todos
- ~add minification to build~
- create npm package (parent side only?)
- push npm package to dnd artifactory repo
- improve build process / file naming
