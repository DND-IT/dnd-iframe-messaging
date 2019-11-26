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