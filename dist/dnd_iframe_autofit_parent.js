!function(){"use strict";function e(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}
/* Version 1.4.0 */var t={},n=[],r=function(e){t[e]&&delete t[e]};function i(i){var o=i.data.id,a=i.data,f=a.iframeId,s=a.type,c=e(a,["iframeId","type"]);if(o=o||f,s&&n.indexOf(s)>=0)if(o)if(t[o]){var u=t[o].handlers[s];u&&u(c)}else r(o);else Object.keys(t).forEach((function(e){t[e]&&t[e].refresh(e)}))}var o;window.addEventListener("message",i),(o=document.querySelectorAll("iframe.autofit")).length&&o.forEach((function(e){e.addEventListener("load",(function(r){!function e(r,i){var o="dnd_iframe_"+Math.random().toString(36).substr(2,8);return t[o]?e():(t[o]={handlers:r,refresh:i},n=n.concat(Object.keys(r)),i(o),o)}({autofit:function(t){var n=t.contentHeight;e.style.height=n+"px"}},(function(e){r.target.contentWindow.postMessage({type:"setAutofit",iframeId:e},"*"),r.target.contentWindow.postMessage({type:"setup",id:e},"*")}))}))}))}();
