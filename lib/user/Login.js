'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_React$Component) {
  _inherits(Login, _React$Component);

  function Login(props) {
    _classCallCheck(this, Login);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      username: '',
      password: ''
    };
    _this.handleLoginSubmission = _this.handleLoginSubmission.bind(_this);
    _this.setUsername = _this.setUsername.bind(_this);
    _this.setPassword = _this.setPassword.bind(_this);
    return _this;
  }

  Login.prototype.handleLoginSubmission = function handleLoginSubmission(e) {
    e.preventDefault();
    this.props.submitLogin(this.state.username, this.state.password);
  };

  Login.prototype.setUsername = function setUsername(e) {
    this.setState({ username: e.target.value });
  };

  Login.prototype.setPassword = function setPassword(e) {
    this.setState({ password: e.target.value });
  };

  Login.prototype.render = function render() {
    return _react2.default.createElement(
      'form',
      { onSubmit: this.handleLoginSubmission },
      _react2.default.createElement(
        _reactBootstrap.FormGroup,
        null,
        _react2.default.createElement(_reactBootstrap.FormControl, {
          type: 'text',
          name: 'username',
          placeholder: 'Username',
          onChange: this.setUsername
        })
      ),
      _react2.default.createElement(
        _reactBootstrap.FormGroup,
        null,
        _react2.default.createElement(_reactBootstrap.FormControl, {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
          onChange: this.setPassword
        })
      ),
      _react2.default.createElement(
        _reactBootstrap.Button,
        { type: 'submit', bsStyle: 'primary', className: 'btn-raised' },
        'Sign in'
      )
    );
  };

  return Login;
}(_react2.default.Component);

Login.propTypes = process.env.NODE_ENV !== "production" ? {
  submitLogin: _propTypes2.default.func
} : {};

exports.default = Login;
module.exports = exports['default'];