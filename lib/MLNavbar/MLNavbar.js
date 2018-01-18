'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _MarkLogicPoweredBy = require('../images/MarkLogic-Powered-By.png');

var _MarkLogicPoweredBy2 = _interopRequireDefault(_MarkLogicPoweredBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLNavbar = function MLNavbar(props) {
  return _react2.default.createElement(
    _reactBootstrap.Navbar,
    { fluid: true },
    _react2.default.createElement(
      _reactBootstrap.Navbar.Header,
      null,
      _react2.default.createElement(
        _reactBootstrap.Navbar.Brand,
        null,
        _react2.default.createElement(
          'a',
          { href: '/', className: 'navbar-left' },
          _react2.default.createElement('img', { src: props.logo || _MarkLogicPoweredBy2.default })
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Navbar.Brand,
        null,
        _react2.default.createElement(
          'a',
          { href: '/' },
          props.title
        )
      ),
      _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null),
      props.content
    )
  );
};

exports.default = MLNavbar;
module.exports = exports['default'];