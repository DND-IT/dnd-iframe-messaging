!function(){"use strict";let t=null;const e={},o={setup:o=>{const{data:{id:d},port:s=window.parent}=o;(t={id:d,port:s}).port instanceof window.MessagePort&&(t.port.onmessage=n,window.removeEventListener("message",n)),Object.keys(e).forEach(t=>e[t]())}},n=t=>o[t.data.type]&&o[t.data.type](t);let d=0;const s=()=>{const e=(()=>{const t=Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),e=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);return Math.min(t,e)})();e!==d&&((e,o)=>{t&&t.port.postMessage({...o,id:t.id,type:e},"*")})("autofit",{contentHeight:d=e})};window.self!==window.parent&&((t,o)=>{e[t]=o})("autofit",()=>{setInterval(s,10)}),window.addEventListener("message",n)}();
