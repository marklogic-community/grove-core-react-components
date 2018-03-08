import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import './CardResult.css';

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var CardResult = function CardResult(props) {
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result'
    },
    React.createElement(
      Panel,
      { bsStyle: 'info',
        style: { height: '200px', overflow: 'hidden' },
        header: React.createElement(
          Link,
          { to: props.detailPath + encodeURIComponent(props.result.uri) },
          props.result.label || prettyUri(props.result.uri)
        )
      },
      React.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        props.result.matches && props.result.matches.map(function (match, index) {
          return React.createElement(SearchSnippet, { match: match, key: index });
        })
      )
    )
  );
};

CardResult.propTypes = process.env.NODE_ENV !== "production" ? {
  result: PropTypes.shape({
    uri: PropTypes.string
  })
} : {};

export default CardResult;