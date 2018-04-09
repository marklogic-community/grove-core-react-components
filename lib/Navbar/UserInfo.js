'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterBootstrap = require('react-router-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserInfo = function UserInfo(_ref) {
  var isAuthenticated = _ref.isAuthenticated,
      currentUsername = _ref.currentUsername,
      submitLogout = _ref.submitLogout,
      loginPath = _ref.loginPath;
  return _react2.default.createElement(
    'div',
    null,
    isAuthenticated ? _react2.default.createElement(
      'div',
      { className: 'pull-right' },
      _react2.default.createElement(
        _reactBootstrap.Navbar.Text,
        null,
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'user' }),
        ' ',
        currentUsername
      ),
      _react2.default.createElement(
        _reactBootstrap.Nav,
        null,
        _react2.default.createElement(
          _reactBootstrap.NavItem,
          {
            onClick: function onClick(e) {
              e.preventDefault();
              submitLogout(currentUsername);
            }
          },
          'Logout'
        )
      )
    ) : _react2.default.createElement(
      _reactBootstrap.Nav,
      { pullRight: true },
      _react2.default.createElement(
        _reactRouterBootstrap.LinkContainer,
        { exact: true, to: loginPath || '/login' },
        _react2.default.createElement(
          _reactBootstrap.NavItem,
          null,
          'Login'
        )
      )
    )
  );
};

UserInfo.propTypes = process.env.NODE_ENV !== "production" ? {
  isAuthenticated: _propTypes2.default.bool,
  currentUsername: _propTypes2.default.string,
  submitLogout: _propTypes2.default.func,
  loginPath: _propTypes2.default.string
} : {};

exports.default = UserInfo;
module.exports = exports['default'];