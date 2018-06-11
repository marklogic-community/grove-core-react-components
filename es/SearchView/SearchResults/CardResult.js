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

var SearchSnippets = function SearchSnippets(_ref) {
  var result = _ref.result;
  return React.createElement(
    'div',
    { className: 'ml-search-result-matches' },
    result.matches && result.matches.map(function (match, index) {
      return React.createElement(SearchSnippet, { match: match, key: index });
    })
  );
};

var Header = function Header(props) {
  return React.createElement(
    'h1',
    { className: 'panel-title' },
    props.result.label || prettyUri(props.result.uri)
  );
};

var CardResult = function CardResult(props) {
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3, className: 'ml-search-result' },
    React.createElement(
      Link,
      {
        to: props.detailPath + encodeURIComponent(props.result.uri),
        style: { textDecoration: 'none' }
      },
      React.createElement(
        Panel,
        {
          bsStyle: 'info',
          style: { height: '200px', overflow: 'hidden' },
          header: props.header && React.createElement(props.header, props)
        },
        React.createElement(props.content, props)
      )
    )
  );
};

CardResult.defaultProps = {
  content: SearchSnippets,
  header: Header,
  detailPath: '/detail'
};

CardResult.propTypes = process.env.NODE_ENV !== "production" ? {
  content: PropTypes.func,
  header: PropTypes.func,
  detailPath: PropTypes.string,
  result: PropTypes.shape({
    uri: PropTypes.string
  })
} : {};

export default CardResult;