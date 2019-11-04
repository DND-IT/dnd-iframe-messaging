/* Version <@VERSION@> */
const frames = {}
let validHandlers = []

/**
 * Register callbacks for an iframe
 *
 * @param {function} handlers object which maps plugin_type to notify callback for that plugin on message receival
 * @param {function} refresh callback that get triggered if a message without ID is received
 * @returns an iframe id
 */
const register = (handlers, refresh) => {
  const id = 'dnd_iframe_' + Math.random().toString(36).substr(2, 8)
  if (!frames[id]) {
    frames[id] = { handlers, refresh }
    validHandlers = validHandlers.concat(Object.keys(handlers))
    refresh(id)
    return id
  }

  return register()
}

/**
 * remove registered callbacks for an iframe
 *
 * @param {string} id iframe id
 */
const unregister = (id) => {
  frames[id] && delete frames[id]
}

/**
 * internal message event listener
 *
 * @param {object} event message event
 */
function run (event) {
  let { id } = event.data
  const { iframeId, type, ...props } = event.data
  id = id || iframeId // legacy support for autofit
  if (type && validHandlers.indexOf(type) >= 0) { // otherwise it's and event/message that is not for us
    if (id) {
      if (frames[id]) {
        const handler = frames[id].handlers[type]
        if (handler) handler(props)
      } else {
        unregister(id)
      }
    } else {
      // one of the iframes lost its ID
      Object.keys(frames).forEach(id => {
        frames[id] && frames[id].refresh(id)
      })
    }
  }
}

/**
 * start listening for post message events
 */
const init = () => {
  window.addEventListener('message', run)
}

export {
  register,
  unregister,
  init
}
