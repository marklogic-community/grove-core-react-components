import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/MarkLogic-Powered-By.png';

var MLNavbar = function MLNavbar(props) {
  return React.createElement(
    Navbar,
    { fluid: true },
    React.createElement(
      Navbar.Header,
      null,
      React.createElement(
        Navbar.Brand,
        null,
        React.createElement(
          'a',
          { href: '/', className: 'navbar-left' },
          React.createElement('img', { src: props.logo || logo })
        )
      ),
      React.createElement(
        Navbar.Brand,
        null,
        React.createElement(
          'a',
          { href: '/' },
          props.title
        )
      ),
      React.createElement(Navbar.Toggle, null)
    )
  );
};

export default MLNavbar;