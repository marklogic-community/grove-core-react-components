'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _reactCodemirror = require('react-codemirror2');

require('codemirror/lib/codemirror.css');

require('codemirror/mode/javascript/javascript.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cmOptions = {
  theme: 'default',
  height: 'auto',
  viewportMargin: Infinity,
  mode: {
    name: 'javascript',
    json: true,
    statementIndent: 2
  },
  lineNumbers: true,
  lineWrapping: true,
  tabSize: 2
};

var CreateView = function (_React$Component) {
  _inherits(CreateView, _React$Component);

  function CreateView(props) {
    _classCallCheck(this, CreateView);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onCodeChange = _this.onCodeChange.bind(_this);

    var initCode = '{\n  "exampleString": "Enter JSON. It will be validated.",\n  "exampleNumber": 1234,\n  "exampleBoolean": true\n}';

    _this.state = {
      code: initCode,
      invalid: false
    };
    return _this;
  }

  CreateView.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.docId !== this.props.docId) {
      this.props.history.push(this.props.redirectPath + '?id=' + this.props.docId);
    }
  };

  CreateView.prototype.onCodeChange = function onCodeChange(editor, metadata, code) {
    this.setState({ invalid: false, code: code });
    try {
      JSON.parse(code);
    } catch (err) {
      this.setState({ invalid: true, code: code });
    }
  };

  CreateView.prototype.render = function render() {
    var _this2 = this;

    var icon = this.state.invalid ? 'remove' : 'ok';
    var cls = this.state.invalid ? 'invalid' : 'valid';
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'panel panel-primary' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement('span', { className: cls + ' glyphicon glyphicon-' + icon }),
          '\xA0JSON Editor'
        ),
        _react2.default.createElement(_reactCodemirror.UnControlled, {
          value: this.state.code,
          onChange: this.onCodeChange,
          autoCursor: false,
          options: cmOptions
        })
      ),
      _react2.default.createElement(
        'form',
        {
          onSubmit: function onSubmit(e) {
            e.preventDefault();
            _this2.props.onCreateExecute(_this2.state.code).then(_this2.setState({ value: '' }));
          }
        },
        _react2.default.createElement(
          _reactBootstrap.Button,
          {
            type: 'submit',
            bsStyle: 'primary',
            className: 'btn-raised',
            disabled: this.state.invalid
          },
          'Submit'
        )
      )
    );
    //}
  };

  return CreateView;
}(_react2.default.Component);

CreateView.propTypes = process.env.NODE_ENV !== "production" ? {
  redirectPath: _propTypes2.default.string.isRequired
} : {};

exports.default = (0, _reactRouterDom.withRouter)(CreateView);
module.exports = exports['default'];