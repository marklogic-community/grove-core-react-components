'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginJumbotron = function LoginJumbotron(props) {
  return _react2.default.createElement(
    _reactBootstrap.Row,
    null,
    _react2.default.createElement(
      _reactBootstrap.Col,
      { md: 6, mdOffset: 3 },
      _react2.default.createElement(
        _reactBootstrap.Jumbotron,
        null,
        _react2.default.createElement(_Login2.default, props)
      )
    )
  );
};

exports.default = LoginJumbotron;
module.exports = exports['default'];