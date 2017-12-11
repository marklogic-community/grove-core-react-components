'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _MLSearchSnippet = require('./MLSearchSnippet.js');

var _MLSearchSnippet2 = _interopRequireDefault(_MLSearchSnippet);

require('./MLSearchResult.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var MLSearchResult = function MLSearchResult(props) {
  return _react2.default.createElement(
    _reactBootstrap.Col,
    { xs: 12, sm: 6, md: 4, lg: 3,
      className: 'ml-search-result'
    },
    _react2.default.createElement(
      _reactBootstrap.Panel,
      null,
      _react2.default.createElement(
        'h4',
        null,
        _react2.default.createElement(
          _reactRouterDom.Link,
          { to: props.detailPath + encodeURIComponent(props.result.uri) },
          props.result.label || prettyUri(props.result.uri)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        props.result.matches && props.result.matches.map(function (match, index) {
          return _react2.default.createElement(_MLSearchSnippet2.default, { match: match, key: index });
        })
      )
    )
  );
};

exports.default = MLSearchResult;
module.exports = exports['default'];