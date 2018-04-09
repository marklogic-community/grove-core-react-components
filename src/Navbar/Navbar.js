import React from 'react';
import PropTypes from 'prop-types';
import { Navbar as BSNavbar } from 'react-bootstrap';
import defaultLogo from '../images/MarkLogic-Powered-By.png';
import UserInfo from './UserInfo';

const Navbar = ({ logo, title, children, withoutUser, ...props }) => (
  <BSNavbar fluid={true}>
    <BSNavbar.Header>
      <BSNavbar.Brand>
        <a href="/" className="navbar-left">
          <img src={logo || defaultLogo} />
        </a>
      </BSNavbar.Brand>
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
