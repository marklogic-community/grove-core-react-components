import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

var getFilename = function getFilename(id) {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

var ListResult = function ListResult(props) {
  return React.createElement(
    Col,
    { xs: 12, className: 'ml-search-result' },
    React.createElement(
      'h4',
      null,
      React.createElement(
        Link,
        {
          to: {
            pathname: props.detailPath,
            state: { id: props.result.id },
            search: '?id=' + props.result.id
          }
        },
        props.result.label || getFilename(props.result.id) || props.result.uri
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