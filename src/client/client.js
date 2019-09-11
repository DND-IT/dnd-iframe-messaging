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
const addCommand = (name, command) => commands[name] = command;

const sendData = (data) => connection && connection.port.postMessage(data, "*");

const init = () => {
    window.addEventListener('message', run);
};

export {
    addPlugin,
    addCommand,
    sendData,
    init
};
