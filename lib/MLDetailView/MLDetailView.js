'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactJsonTree = require('react-json-tree');

var _reactJsonTree2 = _interopRequireDefault(_reactJsonTree);

var _vkbeautify = require('vkbeautify');

var _vkbeautify2 = _interopRequireDefault(_vkbeautify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultTemplate = function defaultTemplate(props) {
  if (!props.detail) {
    return null;
  }
  var renderedRawData = null;
  if (props.contentType) {
    if (props.contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = _react2.default.createElement(_reactJsonTree2.default, { data: props.detail || {}, theme: 'grayscale' });
    } else if (props.contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = _react2.default.createElement(
        'pre',
        null,
        _vkbeautify2.default.xml(props.detail)
      );
    } else {
      renderedRawData = _react2.default.createElement(
        'pre',
        null,
        props.detail
      );
    }
  } else {
    renderedRawData = _react2.default.createElement(
      'pre',
      null,
      props.detail
    );
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      props.label || props.uri
    ),
    renderedRawData
  );
};

var MLDetailView = function (_Component) {
  _inherits(MLDetailView, _Component);

  function MLDetailView() {
    _classCallCheck(this, MLDetailView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MLDetailView.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  };

  MLDetailView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.uri !== this.props.uri) {
      if (!nextProps.detail) {
        nextProps.loadDetail(nextProps.uri);
      }
    }
  };

  MLDetailView.prototype.render = function render() {
    if (this.props.template) {
      return this.props.template(this.props);
    } else {
      return defaultTemplate(this.props);
    }
  };

  return MLDetailView;
}(_react.Component);

MLDetailView.propTypes = process.env.NODE_ENV !== "production" ? {
  detail: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  contentType: _propTypes2.default.string
} : {};

exports.default = MLDetailView;
module.exports = exports['default'];