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
      {props.content}
    </Navbar.Header>
  </Navbar>
);

export default MLNavbar;
