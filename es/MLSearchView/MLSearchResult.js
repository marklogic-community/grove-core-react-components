import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var MLSearchResult = function MLSearchResult(_ref) {
  var result = _ref.result;
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result',
      key: result.uri
    },
    React.createElement(
      Panel,
      null,
      React.createElement(
        'h4',
        null,
        result.label || prettyUri(result.uri)
      ),
      React.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        result.matches.map(function (match, index) {
          return React.createElement(MLSearchSnippet, { match: match, key: index });
        })
      )
    )
  );
};

export default MLSearchResult;