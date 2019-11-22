/* Version <@VERSION@> */
let connection = null

const plugins = {}
const commands = {
  setup: (event) => {
    const { data: { id }, port = window.parent } = event
    connection = { id, port }

    if (connection.port instanceof window.MessagePort) {
      connection.port.onmessage = run
      window.removeEventListener('message', run)
    }

    Object.keys(plugins).forEach((key) => plugins[key]())
  }
}

const run = (event) => commands[event.data.type] && commands[event.data.type](event)

const addPlugin = (name, plugin) => { plugins[name] = plugin }
const addCommand = (name, command) => { commands[name] = command }

const sendData = (type, data) => {
  const payload = { ...data, ...{ id: connection.id, type } }
  connection && connection.port.postMessage(payload, '*')
  postNativeAppMessage(payload)
}

const postNativeAppMessage = (payload) => {
  if (window.webkit && window.webkit.messageHandlers.channel) {
    window.webkit.messageHandlers.channel.postMessage(payload) // iOS message handler detected
  }
  if (window.appInterface) {
    window.appInterface.postMessage(JSON.stringify(payload)) // Android message handler detected
  }
}

const init = () => {
  window.addEventListener('message', run)
}

export {
  addPlugin,
  addCommand,
  sendData,
  init
}
