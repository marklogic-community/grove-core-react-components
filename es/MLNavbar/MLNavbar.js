import React from 'react';
import { Grid, Navbar } from 'react-bootstrap';

var MLNavbar = function MLNavbar(props) {
  return React.createElement(
    Navbar,
    null,
    React.createElement(
      Grid,
      null,
      React.createElement(
        Navbar.Header,
        null,
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
    )
  );
};

export default MLNavbar;