/* eslint import/no-unresolved: [2, { ignore: ['.*'] }] */
import React from 'react'

import { register, unregister, init } from '../parent'

// https://github.com/zeit/next.js/pull/7651
if (typeof window !== 'undefined') {
  init()
}

class IFrameWithMessaging extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: props.height
    }
  }

  static defaultProps = {
    height: 350,
    withLegacySupport: false
  }

  handleCommunication = (event) => {
    event.persist()
    this.setState({
      id: register({
        autofit: ({ contentHeight }) => { this.setState({ height: contentHeight }) }
      },
      (id) => {
        if (this.props.enableLegacySupport) event.target.contentWindow.postMessage({ type: 'setAutofit', iframeId: id }, '*')
        event.target.contentWindow.postMessage({ type: 'setup', id }, '*')
      })
    })
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextState.height !== this.state.height
  }

  componentWillUnmount () {
    unregister(this.state.id)
  }

  render () {
    const style = {
      height: this.state.height
    }

    return (
      <iframe onLoad={this.handleCommunication} src={this.props.url} style={style} scrolling='no' width='100%' height={this.props.height} />
    )
  }
}

export default IFrameWithMessaging
