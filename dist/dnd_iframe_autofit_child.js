!function(){"use strict";
/* Version 1.3.2 */let e=null;const t={},n={setup:n=>{const{data:{id:s},port:d=window.parent}=n;(e={id:s,port:d}).port instanceof window.MessagePort&&(e.port.onmessage=o,window.removeEventListener("message",o)),Object.keys(t).forEach(e=>t[e]())}},o=e=>n[e.data.type]&&n[e.data.type](e),s=e=>{window.webkit&&window.webkit.messageHandlers.dndIframeMessaging&&window.webkit.messageHandlers.dndIframeMessaging.postMessage(e),window.appInterface&&window.appInterface.postMessage(JSON.stringify(e))};let d=0;const i=()=>{const t=(()=>{const e=Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);return Math.min(e,t)})();t!==d&&((t,n)=>{const o={...n,id:e.id,type:t};e&&e.port.postMessage(o,"*"),s(o)})("autofit",{contentHeight:d=t})};window.self!==window.parent&&((e,n)=>{t[e]=n})("autofit",()=>{setInterval(i,10)}),window.addEventListener("message",o)}();
