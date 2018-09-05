var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as BSNavbar } from 'react-bootstrap';
import UserInfo from './UserInfo';

var Navbar = function Navbar(_ref) {
  var logo = _ref.logo,
      logoStyle = _ref.logoStyle,
      title = _ref.title,
      children = _ref.children,
      withoutUser = _ref.withoutUser,
      props = _objectWithoutProperties(_ref, ['logo', 'logoStyle', 'title', 'children', 'withoutUser']);

  return React.createElement(
    BSNavbar,
    { fluid: true },
    React.createElement(
      BSNavbar.Header,
      null,
      logo && React.createElement(
        BSNavbar.Brand,
        null,
        React.createElement(
          'div',
          { className: 'navbar-left' },
          React.createElement(
            props.brandLink,
            null,
            React.createElement('img', {
              src: logo,
              style: logoStyle || { maxWidth: '100px', maxHeight: '45px' }
            })
          )
        )
      ),
      React.createElement(
        BSNavbar.Brand,
        null,
        React.createElement(
          props.brandLink,
          null,
          React.createElement(
            'span',
            null,
            title
          )
        )
      ),
      React.createElement(BSNavbar.Toggle, null)
    ),
    React.createElement(
      BSNavbar.Collapse,
      null,
      children,
      !withoutUser && React.createElement(UserInfo, {
        isAuthenticated: props.isAuthenticated,
        currentUsername: props.currentUsername,
        submitLogout: props.submitLogout,
        loginPath: props.loginPath
      })
    )
  );
};

var defaultBrandLink = function defaultBrandLink(props) {
  return React.createElement('a', _extends({ href: '/' }, props));
};

Navbar.defaultProps = {
  brandLink: defaultBrandLink
};

Navbar.propTypes = process.env.NODE_ENV !== "production" ? {
  title: PropTypes.string,
  brandLink: PropTypes.func,
  withoutUser: PropTypes.bool
} : {};

export default Navbar;