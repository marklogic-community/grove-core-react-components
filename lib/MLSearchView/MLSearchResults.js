'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MLSearchResult = require('./MLSearchResult');

var _MLSearchResult2 = _interopRequireDefault(_MLSearchResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results,
      ResultComponent = _ref.resultComponent;
  return _react2.default.createElement(
    'div',
    { className: 'ml-search-results' },
    results && results.map(function (result) {
      return _react2.default.createElement(ResultComponent, { result: result, key: result.uri });
    })
  );
};

MLSearchResults.defaultProps = { resultComponent: _MLSearchResult2.default };

exports.default = MLSearchResults;
module.exports = exports['default'];