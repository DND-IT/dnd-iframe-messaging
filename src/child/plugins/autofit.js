/* Version <@VERSION@> */
import { sendData, addPlugin } from '../child'

const type = 'autofit'
let contentHeight = 0

const getContentSize = () => {
  const bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight)
  const documentHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  )

  return Math.min(bodyHeight, documentHeight)
}

const run = () => {
  const contentSize = getContentSize()

  if (contentSize !== contentHeight) {
    contentHeight = contentSize
    sendData(type, { contentHeight })
  }
}

const plugin = () => {
  if (window.self !== window.parent) {
    addPlugin(type, () => {
      setInterval(run, 10)
    })
  }
}

export default plugin
