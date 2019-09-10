const frames = {};

/**
 * Register callbacks for an iframe
 * 
 * @param {function} notify callback to notify on message receival
 * @param {function} refresh callback that get triggered if a message without ID is received
 * @returns an iframe id
 */
const register = (notify, refresh) => {
    const id = "autofit_" + Math.random().toString(36).substr(2, 8);
​
    if(!frames[id]) {
        frames[id] = {notify, refresh};
        return id;
    }
    
    return register();
};
​
/**
 * remove registered callbacks for an iframe
 * 
 * @param {string} id iframe id
 */
const unregister = (id) => {
    frames[id] && delete frames[id];
};
​
/**
 * internal message event listener
 * 
 * @param {object} event message event
 */
function run(event) {
    const {id, ...props} = event.data;

    if(id) {
        if(frames[id]) {
            frames[id].notify(props);
        } else {
            unregister(id);
        }
    } else {
        // one of the iframes lost its ID
        Object.keys(frames).forEach(id => {
            frames[id] && frames[id].refresh(id);
        });
    }
}

/**
 * start listening for post message events
 */
const init = () => {
    window.addEventListener("message", run);
};

export {
    register,
    unregister,
    init
};​
