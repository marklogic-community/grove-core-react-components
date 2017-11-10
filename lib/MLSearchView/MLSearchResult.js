'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _MLSearchSnippet = require('./MLSearchSnippet.js');

var _MLSearchSnippet2 = _interopRequireDefault(_MLSearchSnippet);

require('./MLSearchResult.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prettyUri = function prettyUri(uri) {
  var uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

var MLSearchResult = function MLSearchResult(_ref) {
  var result = _ref.result;
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
        result.label || prettyUri(result.uri)
      ),
      _react2.default.createElement(
        'div',
        { className: 'ml-search-result-matches' },
        result.matches && result.matches.map(function (match, index) {
          return _react2.default.createElement(_MLSearchSnippet2.default, { match: match, key: index });
        })
      )
    )
  );
};

exports.default = MLSearchResult;
module.exports = exports['default'];