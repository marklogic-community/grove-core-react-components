import React from 'react';
import { Navbar } from 'react-bootstrap';
import logo from '../images/MarkLogic-Powered-By.png';

const MLNavbar = (props) => (
  <Navbar fluid={true}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/" className="navbar-left">
          <img src={props.logo || logo} />
        </a>
      </Navbar.Brand>
      <Navbar.Brand>
        <a href="/">{props.title}</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {props.children}
    </Navbar.Collapse>
  </Navbar>
);

export default MLNavbar;
