'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _MLSearchSnippet = require('./MLSearchSnippet.js');

var _MLSearchSnippet2 = _interopRequireDefault(_MLSearchSnippet);

require('./MLSearchResults.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchResults = function MLSearchResults(props) {
  var results = props.results;
  var resultElements = results.map(function (result) {
    return _react2.default.createElement(
      _reactBootstrap.Col,
      { xs: 12, sm: 6, md: 4, lg: 3, className: 'ml-search-result', key: result.uri },
      _react2.default.createElement(
        _reactBootstrap.Panel,
        null,
        _react2.default.createElement(
          'h4',
          null,
          result.label || result.uri
        ),
        _react2.default.createElement(
          'div',
          { className: 'ml-search-result-matches' },
          result.matches.map(function (match, index) {
            return _react2.default.createElement(_MLSearchSnippet2.default, { match: match, key: index });
          })
        )
      )
    );
  });

  return _react2.default.createElement(
    'div',
    { className: 'ml-search-results' },
    resultElements
  );
};

exports.default = MLSearchResults;
module.exports = exports['default'];