import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var ListResult = function ListResult(props) {
  return React.createElement(
    Col,
    { xs: 12,
      className: 'ml-search-result'
    },
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
        return React.createElement(SearchSnippet, { match: match, key: index });
      })
    ),
    React.createElement('hr', null)
  );
};

export default ListResult;