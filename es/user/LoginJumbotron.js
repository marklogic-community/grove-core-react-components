import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import Login from './Login';

var LoginJumbotron = function LoginJumbotron(props) {
  return React.createElement(
    Row,
    null,
    React.createElement(
      Col,
      { md: 6, mdOffset: 3 },
      React.createElement(
        Jumbotron,
        null,
        React.createElement(Login, props)
      )
    )
  );
};

export default LoginJumbotron;