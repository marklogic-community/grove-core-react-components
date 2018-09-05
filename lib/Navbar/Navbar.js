'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _UserInfo = require('./UserInfo');

var _UserInfo2 = _interopRequireDefault(_UserInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Navbar = function Navbar(_ref) {
  var logo = _ref.logo,
      logoStyle = _ref.logoStyle,
      title = _ref.title,
      children = _ref.children,
      withoutUser = _ref.withoutUser,
      props = _objectWithoutProperties(_ref, ['logo', 'logoStyle', 'title', 'children', 'withoutUser']);

  return _react2.default.createElement(
    _reactBootstrap.Navbar,
    { fluid: true },
    _react2.default.createElement(
      _reactBootstrap.Navbar.Header,
      null,
      logo && _react2.default.createElement(
        _reactBootstrap.Navbar.Brand,
        null,
        _react2.default.createElement(
          'div',
          { className: 'navbar-left' },
          _react2.default.createElement(
            props.brandLink,
            null,
            _react2.default.createElement('img', {
              src: logo,
              style: logoStyle || { maxWidth: '100px', maxHeight: '45px' }
            })
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Navbar.Brand,
        null,
        _react2.default.createElement(
          props.brandLink,
          null,
          _react2.default.createElement(
            'span',
            null,
            title
          )
        )
      ),
      _react2.default.createElement(_reactBootstrap.Navbar.Toggle, null)
    ),
    _react2.default.createElement(
      _reactBootstrap.Navbar.Collapse,
      null,
      children,
      !withoutUser && _react2.default.createElement(_UserInfo2.default, {
        isAuthenticated: props.isAuthenticated,
        currentUsername: props.currentUsername,
        submitLogout: props.submitLogout,
        loginPath: props.loginPath
      })
    )
  );
};

var defaultBrandLink = function defaultBrandLink(props) {
  return _react2.default.createElement('a', _extends({ href: '/' }, props));
};

Navbar.defaultProps = {
  brandLink: defaultBrandLink
};

Navbar.propTypes = process.env.NODE_ENV !== "production" ? {
  title: _propTypes2.default.string,
  brandLink: _propTypes2.default.func,
  withoutUser: _propTypes2.default.bool
} : {};

exports.default = Navbar;
module.exports = exports['default'];