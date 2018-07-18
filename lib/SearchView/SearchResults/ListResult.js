'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _SearchSnippet = require('./SearchSnippet.js');

var _SearchSnippet2 = _interopRequireDefault(_SearchSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var ListResult = function ListResult(props) {
  return _react2.default.createElement(
    _reactBootstrap.Col,
    { xs: 12, className: 'ml-search-result' },
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
        return _react2.default.createElement(_SearchSnippet2.default, { match: match, key: index });
      })
    ),
    _react2.default.createElement('hr', null)
  );
};

exports.default = ListResult;
module.exports = exports['default'];