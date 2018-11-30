function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

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
    return React.createElement(
      'form',
      { onSubmit: this.handleLoginSubmission },
      React.createElement(
        FormGroup,
        null,
        React.createElement(FormControl, {
          type: 'text',
          name: 'username',
          placeholder: 'Username',
          onChange: this.setUsername
        })
      ),
      React.createElement(
        FormGroup,
        null,
        React.createElement(FormControl, {
          type: 'password',
          name: 'password',
          placeholder: 'Password',
          onChange: this.setPassword
        })
      ),
      React.createElement(
        Button,
        { type: 'submit', bsStyle: 'primary', className: 'btn-raised' },
        'Sign in'
      )
    );
  };

  return Login;
}(React.Component);

Login.propTypes = process.env.NODE_ENV !== "production" ? {
  submitLogin: PropTypes.func
} : {};

export default Login;