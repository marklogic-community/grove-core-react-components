import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as BSNavbar } from 'react-bootstrap';
import UserInfo from './UserInfo';

const Navbar = ({
  logo,
  logoStyle,
  title,
  children,
  withoutUser,
  ...props
}) => (
  <BSNavbar fluid={true}>
    <BSNavbar.Header>
      {logo && (
        <BSNavbar.Brand>
          <a href="/" className="navbar-left">
            <img
              src={logo}
              style={logoStyle || { maxWidth: '100px', maxHeight: '45px' }}
            />
          </a>
        </BSNavbar.Brand>
      )}
      <BSNavbar.Brand>
        <a href="/">{title}</a>
      </BSNavbar.Brand>
      <BSNavbar.Toggle />
    </BSNavbar.Header>
    <BSNavbar.Collapse>
      {children}
      {!withoutUser && <UserInfo {...props} />}
    </BSNavbar.Collapse>
  </BSNavbar>
);

Navbar.propTypes = {
  title: PropTypes.string,
  withoutUser: PropTypes.bool
};

export default Navbar;
