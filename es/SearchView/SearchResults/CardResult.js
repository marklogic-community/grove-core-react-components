import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import './CardResult.css';

var getFilename = function getFilename(id) {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
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
    props.result.label || getFilename(props.result.id) || props.result.uri
  );
};

var CardResult = function CardResult(props) {
  return React.createElement(
    Col,
    { xs: 12, sm: 6, md: 4, lg: 3, className: 'ml-search-result' },
    React.createElement(
      Link,
      {
        to: {
          pathname: props.detailPath,
          state: { id: props.result.id },
          search: '?id=' + props.result.id
        },
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
    id: PropTypes.string
  })
} : {};

export default CardResult;