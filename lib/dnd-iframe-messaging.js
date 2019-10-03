(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.iframeWithAutofitChild = factory(global.React));
}(this, function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;

    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }

    return target;
  }

  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};

    var target = _objectWithoutPropertiesLoose(source, excluded);

    var key, i;

    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }

    return target;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /* Version 1.0.5 */
  var connection = null;
  var plugins = {};
  var commands = {
    setup: function setup(event) {
      var id = event.data.id,
          _event$port = event.port,
          port = _event$port === void 0 ? window.parent : _event$port;
      connection = {
        id: id,
        port: port
      };

      if (connection.port instanceof window.MessagePort) {
        connection.port.onmessage = run;
        window.removeEventListener('message', run);
      }

      Object.keys(plugins).forEach(function (key) {
        return plugins[key]();
      });
    }
  };

  var run = function run(event) {
    return commands[event.data.type] && commands[event.data.type](event);
  };

  var addPlugin = function addPlugin(name, plugin) {
    plugins[name] = plugin;
  };

  var addCommand = function addCommand(name, command) {
    commands[name] = command;
  };

  var sendData = function sendData(type, data) {
    connection && connection.port.postMessage(_objectSpread2({}, data, {}, {
      id: connection.id,
      type: type
    }), '*');
  };

  var init = function init() {
    window.addEventListener('message', run);
  };

  var child = /*#__PURE__*/Object.freeze({
    addPlugin: addPlugin,
    addCommand: addCommand,
    sendData: sendData,
    init: init
  });

  var type = 'autofit';
  var contentHeight = 0;

  var getContentSize = function getContentSize() {
    var bodyHeight = Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    return Math.min(bodyHeight, documentHeight);
  };

  var run$1 = function run() {
    var contentSize = getContentSize();

    if (contentSize !== contentHeight) {
      contentHeight = contentSize;
      sendData(type, {
        contentHeight: contentHeight
      });
    }
  };

  var plugin = function plugin() {
    if (window.self !== window.parent) {
      addPlugin(type, function () {
        setInterval(run$1, 10);
      });
    }
  };

  var frames = {};
  var validHandlers = [];
  /**
   * Register callbacks for an iframe
   *
   * @param {function} handlers object which maps plugin_type to notify callback for that plugin on message receival
   * @param {function} refresh callback that get triggered if a message without ID is received
   * @returns an iframe id
   */

  var register = function register(handlers, refresh) {
    var id = 'dnd_iframe_' + Math.random().toString(36).substr(2, 8);

    if (!frames[id]) {
      frames[id] = {
        handlers: handlers,
        refresh: refresh
      };
      validHandlers = validHandlers.concat(Object.keys(handlers));
      refresh(id);
      return id;
    }

    return register();
  };
  /**
   * remove registered callbacks for an iframe
   *
   * @param {string} id iframe id
   */


  var unregister = function unregister(id) {
    frames[id] && delete frames[id];
  };
  /**
   * internal message event listener
   *
   * @param {object} event message event
   */


  function run$2(event) {
    var id = event.data.id;

    var _event$data = event.data,
        iframeId = _event$data.iframeId,
        type = _event$data.type,
        props = _objectWithoutProperties(_event$data, ["iframeId", "type"]);

    id = id || iframeId; // legacy support for autofit

    if (type && validHandlers.indexOf(type) >= 0) {
      // otherwise it's and event/message that is not for us
      if (id) {
        if (frames[id]) {
          var handler = frames[id].handlers[type];
          if (handler) handler(props);
        } else {
          unregister(id);
        }
      } else {
        // one of the iframes lost its ID
        Object.keys(frames).forEach(function (id) {
          frames[id] && frames[id].refresh(id);
        });
      }
    }
  }
  /**
   * start listening for post message events
   */


  var init$1 = function init() {
    window.addEventListener('message', run$2);
  };

  var parent = /*#__PURE__*/Object.freeze({
    register: register,
    unregister: unregister,
    init: init$1
  });

  if (typeof window !== 'undefined') {
    init$1();
  }

  var IFrameWithMessaging =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(IFrameWithMessaging, _React$Component);

    function IFrameWithMessaging(props) {
      var _this;

      _classCallCheck(this, IFrameWithMessaging);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(IFrameWithMessaging).call(this, props));

      _defineProperty(_assertThisInitialized(_this), "handleCommunication", function (event) {
        event.persist();

        _this.setState({
          id: register({
            autofit: function autofit(_ref) {
              var contentHeight = _ref.contentHeight;

              _this.setState({
                height: contentHeight
              });
            }
          }, function (id) {
            if (_this.props.enableLegacySupport) event.target.contentWindow.postMessage({
              type: 'setAutofit',
              iframeId: id
            }, '*');
            event.target.contentWindow.postMessage({
              type: 'setup',
              id: id
            }, '*');
          })
        });
      });

      _this.state = {
        height: props.height
      };
      return _this;
    }

    _createClass(IFrameWithMessaging, [{
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return nextState.height !== this.state.height;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        unregister(this.state.id);
      }
    }, {
      key: "render",
      value: function render() {
        var style = {
          height: this.state.height
        };
        return React.createElement("iframe", {
          onLoad: this.handleCommunication,
          src: this.props.url,
          style: style,
          scrolling: "no",
          width: "100%",
          height: this.props.height
        });
      }
    }]);

    return IFrameWithMessaging;
  }(React.Component);

  _defineProperty(IFrameWithMessaging, "defaultProps", {
    height: 350,
    withLegacySupport: false
  });

  var index = {
    child: child,
    autofitPlugin: plugin,
    parent: parent,
    IFrameWithMessaging: IFrameWithMessaging
  };

  return index;

}));
