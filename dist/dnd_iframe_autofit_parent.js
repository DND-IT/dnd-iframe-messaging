!function(){"use strict";
/* Version 1.3.3 */const e={};let t=[];const n=(s,o)=>{const a="dnd_iframe_"+Math.random().toString(36).substr(2,8);return e[a]?n():(e[a]={handlers:s,refresh:o},t=t.concat(Object.keys(s)),o(a),a)},s=t=>{e[t]&&delete e[t]};function o(n){let{id:o}=n.data;const{iframeId:a,type:i,...r}=n.data;if(o=o||a,i&&t.indexOf(i)>=0)if(o)if(e[o]){const t=e[o].handlers[i];t&&t(r)}else s(o);else Object.keys(e).forEach(t=>{e[t]&&e[t].refresh(t)})}window.addEventListener("message",o),(()=>{const e=document.querySelectorAll("iframe.autofit");e.length&&e.forEach(e=>{e.addEventListener("load",t=>{n({autofit:({contentHeight:t})=>{e.style.height=t+"px"}},e=>{t.target.contentWindow.postMessage({type:"setAutofit",iframeId:e},"*"),t.target.contentWindow.postMessage({type:"setup",id:e},"*")})})})})()}();
