'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLNavbar = function MLNavbar(props) {
  return _react2.default.createElement(
    _reactBootstrap.Navbar,
    null,
    _react2.default.createElement(
      _reactBootstrap.Grid,
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar.Header,
        null,
        _react2.default.createElement(
          _reactBootstrap.Navbar.Brand,
          null,
          _react2.default.createElement(
            'a',
            { href: '/' },
            props.title
          )
        ),
        _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
      )
    )
  );
};

exports.default = MLNavbar;
module.exports = exports['default'];