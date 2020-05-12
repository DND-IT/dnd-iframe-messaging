/* Version <@VERSION@> */
/*
  This is a special version of the autofit plugin just for datawrapper.
  They define a callback in the global namespace that is called from their
  side whenever the height changes.
 */
import { sendData, addPlugin } from '../child'

const type = 'autofit'
let contentHeight = 0

const updateContentHeight = height => {
  if (contentHeight !== height) {
    contentHeight = height
    sendData(type, { contentHeight })
  }
}

const plugin = () => {
  if (window.self !== window.parent) {
    addPlugin(type, () => {
      window.datawrapperHeightCallback = updateContentHeight
    })
  }
}

export default plugin
