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

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewAsJson = function ViewAsJson(_ref) {
  var detail = _ref.detail,
      contentType = _ref.contentType,
      label = _ref.label,
      uri = _ref.uri;

  if (!detail) {
    return null;
  }
  var renderedRawData = null;
  if (contentType) {
    if (contentType.lastIndexOf('application/json') !== -1) {
      renderedRawData = _react2.default.createElement(_reactJsonTree2.default, { data: detail || {}, theme: 'grayscale' });
    } else if (contentType.lastIndexOf('application/xml') !== -1) {
      renderedRawData = _react2.default.createElement(
        'pre',
        null,
        _vkbeautify2.default.xml(detail)
      );
    } else {
      renderedRawData = _react2.default.createElement(
        'pre',
        null,
        detail
      );
    }
  } else {
    renderedRawData = _react2.default.createElement(
      'pre',
      null,
      detail
    );
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h1',
      null,
      label || uri
    ),
    renderedRawData
  );
};

var DetailView = function (_Component) {
  _inherits(DetailView, _Component);

  function DetailView() {
    _classCallCheck(this, DetailView);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DetailView.prototype.componentDidMount = function componentDidMount() {
    if (!this.props.detail) {
      this.props.loadDetail(this.props.uri);
    }
  };

  DetailView.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.uri !== this.props.uri) {
      if (!this.props.detail) {
        this.props.loadDetail(this.props.uri);
      }
    }
  };

  DetailView.prototype.render = function render() {
    var _this2 = this;

    return _react2.default.createElement(
      _reactBootstrap.Row,
      null,
      _react2.default.createElement(
        _reactBootstrap.Col,
        { md: 12 },
        _react2.default.createElement(
          'div',
          { className: 'pull-right' },
          _react2.default.createElement(
            _reactBootstrap.Button,
            {
              bsStyle: 'default',
              bsSize: 'small',
              className: 'btn-raised',
              onClick: function onClick() {
                return _this2.props.loadDetail(_this2.props.uri);
              }
            },
            _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'refresh' })
          )
        ),
        this.props.error ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'There was an error retrieving this document.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'The server sent the following error message:\xA0',
            _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              this.props.error
            )
          )
        ) : _react2.default.createElement(this.props.template, this.props)
      )
    );
  };

  return DetailView;
}(_react.Component);

DetailView.defaultProps = {
  template: ViewAsJson
};

DetailView.propTypes = process.env.NODE_ENV !== "production" ? {
  detail: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  template: _propTypes2.default.func,
  contentType: _propTypes2.default.string,
  error: _propTypes2.default.string
} : {};

exports.default = DetailView;
module.exports = exports['default'];