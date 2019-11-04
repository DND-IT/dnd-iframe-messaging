// bundles the parent script together with legacy autofit support enabled
// mostly used for native apps
import { register, init } from '../../src/parent/parent'

const initializeIframes = () => {
  const currentIframes = document.querySelectorAll('iframe')
  if (currentIframes.length) {
    currentIframes.forEach((iframe) => {
      iframe.addEventListener('load', (event) => {
        register({
          autofit: ({ contentHeight }) => { iframe.style.height = contentHeight + 'px' }
        },
        (id) => {
          event.target.contentWindow.postMessage({ type: 'setAutofit', iframeId: id }, '*')
          event.target.contentWindow.postMessage({ type: 'setup', id }, '*')
        })
      })
    })
  }
}

init()
initializeIframes()
