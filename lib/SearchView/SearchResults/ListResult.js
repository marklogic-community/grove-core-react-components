'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactRouterDom = require('react-router-dom');

var _SearchSnippet = require('./SearchSnippet.js');

var _SearchSnippet2 = _interopRequireDefault(_SearchSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFilename = function getFilename(id) {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
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