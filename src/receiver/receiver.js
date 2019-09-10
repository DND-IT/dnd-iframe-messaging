const frames = {};

const register = (notify, init) => {
    const id = "autofit_" + Math.random().toString(36).substr(2, 8);
​
    if(!frames[id]) {
        frames[id] = {notify, init};
        return id;
    }
    
    return register();
};
​
const unregister = (id) => {
    frames[id] && delete frames[id];
};
​
function run(e) {
    const {id, ...props} = e.data;

    if(id) {
        if(frames[id]) {
            frames[id].notify(props);
        } else {
            unregister(id);
        }
    } else {
        // one of the iframes lost its ID
        Object.keys(frames).forEach(id => {
            frames[id] && frames[id].init(id);
        });
    }
}

const init = () => {
    window.addEventListener("message", run);
};

export {
    register,
    unregister,
    init
};​
