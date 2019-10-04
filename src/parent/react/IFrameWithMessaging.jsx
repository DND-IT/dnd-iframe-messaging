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
      height: props.minHeight
    }
  }

  static defaultProps = {
    minHeight: 0,
    initialHeight: 350,
    withLegacySupport: false,
    className: '',
    width: '100%',
    allowFullScreen: false
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
    const { className, url, width, initialHeight, minHeight, allowFullScreen } = this.props

    const style = {
      height: Math.max(this.state.height, minHeight)
    }

    return (
      <iframe
        onLoad={this.handleCommunication}
        className={className}
        src={url}
        style={style}
        width={width}
        height={initialHeight}
        allowFullScreen={allowFullScreen}
        scrolling='no'
        frameBorder='no'
      />
    )
  }
}

export default IFrameWithMessaging
