'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _SearchSnippet = require('./SearchSnippet.js');

var _SearchSnippet2 = _interopRequireDefault(_SearchSnippet);

require('./CardResult.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilename = function getFilename(id) {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

var SearchSnippets = function SearchSnippets(_ref) {
  var result = _ref.result;
  return _react2.default.createElement(
    'div',
    { className: 'ml-search-result-matches' },
    result.matches && result.matches.map(function (match, index) {
      return _react2.default.createElement(_SearchSnippet2.default, { match: match, key: index });
    })
  );
};

var Header = function Header(props) {
  return _react2.default.createElement(
    'h1',
    { className: 'panel-title' },
    props.result.label || getFilename(props.result.id) || props.result.uri
  );
};

var CardResult = function CardResult(props) {
  return _react2.default.createElement(
    _reactBootstrap.Col,
    { xs: 12, sm: 6, md: 4, lg: 3, className: 'ml-search-result' },
    _react2.default.createElement(
      _reactRouterDom.Link,
      {
        to: {
          pathname: props.detailPath,
          state: { id: props.result.id },
          search: '?id=' + props.result.id
        },
        style: { textDecoration: 'none' }
      },
      _react2.default.createElement(
        _reactBootstrap.Panel,
        {
          bsStyle: 'info',
          style: { height: '200px', overflow: 'hidden' },
          header: props.header && _react2.default.createElement(props.header, props)
        },
        _react2.default.createElement(props.content, props)
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
  content: _propTypes2.default.func,
  header: _propTypes2.default.func,
  detailPath: _propTypes2.default.string,
  result: _propTypes2.default.shape({
    id: _propTypes2.default.string
  })
} : {};

exports.default = CardResult;
module.exports = exports['default'];