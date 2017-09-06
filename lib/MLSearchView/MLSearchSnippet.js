'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchSnippet = function MLSearchSnippet(props) {
  var match = props.match;
  var matchSpans = match['match-text'].map(function (text, index) {
    return _react2.default.createElement(
      'em',
      { className: text.highlight ? 'mark' : '', key: index },
      text.highlight || text
    );
  });

  return _react2.default.createElement(
    'div',
    { className: 'ml-search-result-match' },
    matchSpans
  );
};

exports.default = MLSearchSnippet;
module.exports = exports['default'];