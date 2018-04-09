import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, Nav, NavItem, Navbar as BSNavbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

var UserInfo = function UserInfo(_ref) {
  var isAuthenticated = _ref.isAuthenticated,
      currentUsername = _ref.currentUsername,
      submitLogout = _ref.submitLogout,
      loginPath = _ref.loginPath;
  return React.createElement(
    'div',
    null,
    isAuthenticated ? React.createElement(
      'div',
      { className: 'pull-right' },
      React.createElement(
        BSNavbar.Text,
        null,
        React.createElement(Glyphicon, { glyph: 'user' }),
        ' ',
        currentUsername
      ),
      React.createElement(
        Nav,
        null,
        React.createElement(
          NavItem,
          {
            onClick: function onClick(e) {
              e.preventDefault();
              submitLogout(currentUsername);
            }
          },
          'Logout'
        )
      )
    ) : React.createElement(
      Nav,
      { pullRight: true },
      React.createElement(
        LinkContainer,
        { exact: true, to: loginPath || '/login' },
        React.createElement(
          NavItem,
          null,
          'Login'
        )
      )
    )
  );
};

UserInfo.propTypes = process.env.NODE_ENV !== "production" ? {
  isAuthenticated: PropTypes.bool,
  currentUsername: PropTypes.string,
  submitLogout: PropTypes.func,
  loginPath: PropTypes.string
} : {};

export default UserInfo;