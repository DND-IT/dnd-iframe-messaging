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
    withLegacySupport: false,
    className: '',
    width: '100%'
  }

  handleCommunication = (event) => {
    event.persist()
    this.setState({
      id: register({
        // eslint-disable-next-line no-console
        autofit: ({ contentHeight }) => { console.log('new height', contentHeight); this.setState({ height: contentHeight }) }
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
      height: Math.max(this.state.height, this.props.height)
    }

    const { className, url, width, height, ...rest } = this.props

    return (
      <iframe
        onLoad={this.handleCommunication}
        className={className}
        src={url}
        style={style}
        width={width}
        height={height}
        scrolling='no'
        frameborder='no'
        {...rest}
      />
    )
  }
}

export default IFrameWithMessaging
