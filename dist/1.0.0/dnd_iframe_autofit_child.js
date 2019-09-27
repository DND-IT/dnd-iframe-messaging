(function () {
  'use strict';

  let connection = null;

  const plugins = {};
  const commands = {
      'setup': (event) => {
          const {data: {id}, port = window.parent} = event;
          connection = {id, port};

          if(connection.port instanceof window.MessagePort) {
              connection.port.onmessage = run;
              window.removeEventListener('message', run);
          }

          Object.keys(plugins).forEach((key) => plugins[key]());
      }
  };

  const run = (event) => commands[event.data.type] && commands[event.data.type](event);

  const addPlugin = (name, plugin) => plugins[name] = plugin;

  const sendData = (type, data) => {
    connection && connection.port.postMessage({...data, ...{id: connection.id, type}}, "*");
  };

  const init = () => {
      window.addEventListener('message', run);
  };

  const type = 'autofit';
  let contentHeight = 0;

  const getContentSize = () => {
      const bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
      const documentHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
      );

      return Math.min(bodyHeight, documentHeight);
  };

  const run$1 = () => {
      const contentSize = getContentSize();
      
      if(contentSize !== contentHeight) {
          contentHeight = contentSize;
          sendData(type, {contentHeight});
      }
  };

  const plugin = () => {
      if(window.self !== window.parent) {
          addPlugin(type, () => {
              setInterval(run$1, 10);
          });
      }
  };

  plugin();
  init();

}());
