import React from 'react';

import {register, unregister, init} from '../receiver';
​
if(process.browser) {
    init();
}
​
class Receiver extends React.Component {
    onLoad = (event) => {
        this.setState({
            id: register(
                ({type, height}) => type === 'autofit' && this.setState({height}),
                (id) => event.target.contentWindow.postMessage({type: "setup", id}, "*")
            )
        });
    };

    static defaultProps = {
        height: 350
    };

    state = {
        height: this.props.height
    };
​
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.height !== this.state.height;
    }
​
    componentWillUnmount() {
        unregister(this.state.id);
    }
​
    render() {
        const style = {
            height: this.state.height
        };
​
        return (
            <iframe onLoad={this.onLoad} src={this.props.url} style={style} scrolling="no" width="100%" height="350"></iframe>
        )
    }
}
​
export default Receiver;
