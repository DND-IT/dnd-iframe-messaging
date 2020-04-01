## 1.4.0 (April 1, 2020)

* added Babel to provide ES5 compatibility (IE11 especially) ([@backtick](https://github.com/backtick))

## 1.2.5 (December 17, 2019)

### IFrameWithMessaging component

* removed unnecessary default props ([@andi](https://github.com/andi))

## 1.2.4 (December 17, 2019)

### IFrameWithMessaging component

* renamed maxHeight attribute to data-maxheight ([@andi](https://github.com/andi))

## 1.2.3 (November 27, 2019)

### IFrameWithMessaging component

* added maxHeight in react component for debugging ([@andi](https://github.com/andi))

## 1.2.2 (November 26, 2019)

### src/child/child.js

* use specific channel name "dndIframeMessaging" for native webkit integration

## 1.2.1 (November 22, 2019)

### src/child/child.js

* if child-page (child-script) is included in native app, it triggers postMessage "natively"... (IA-574)

## 1.2.0

* never pushed due to npm auth issues

## 1.1.7 (November 8, 2019)

### IFrameWithMessaging component

* fixed defaultValue name for enableLegacySupport property ([@andi](https://github.com/andi))

## 1.1.6 (October 22, 2019)

### IFrameWithMessaging component

* still render iframe during SSR, but skip onLoad function ([@andi](https://github.com/andi))

## 1.1.5 (October 22, 2019)

### IFrameWithMessaging component

* Changed render function to return null if SSR ([@andi](https://github.com/andi))