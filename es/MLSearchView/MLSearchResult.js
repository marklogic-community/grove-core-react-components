import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MLSearchSnippet from './MLSearchSnippet.js';
import './MLSearchResult.css';

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var MLSearchResult = function MLSearchResult(props) {
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result'
    },
    React.createElement(
      Panel,
      null,
      React.createElement(
        'h4',
        null,
        React.createElement(
          Link,
          { to: props.detailPath + encodeURIComponent(props.result.uri) },
          props.result.label || prettyUri(props.result.uri)
        )
      ),
      React.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        props.result.matches && props.result.matches.map(function (match, index) {
          return React.createElement(MLSearchSnippet, { match: match, key: index });
        })
      )
    )
  );
};

export default MLSearchResult;