'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MLSearchResult = require('./MLSearchResult');

var _MLSearchResult2 = _interopRequireDefault(_MLSearchResult);

require('./MLSearchResults.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results;
  return _react2.default.createElement(
    'div',
    { className: 'ml-search-results' },
    results.map(function (result) {
      return _react2.default.createElement(_MLSearchResult2.default, { result: result, key: result.uri });
    })
  );
};

exports.default = MLSearchResults;
module.exports = exports['default'];