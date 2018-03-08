'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchMetrics = function SearchMetrics(_ref) {
  var time = _ref.time,
      total = _ref.total;

  if (!time && !total) {
    return null;
  }
  var announcement = 'Found ';
  if (total || total === 0) {
    announcement = announcement + (total + ' ');
  }
  announcement = announcement + 'results';
  if (time) {
    announcement = announcement + (' in ' + time.toFixed(3) + ' seconds');
  }
  announcement = announcement + '.';
  return _react2.default.createElement(
    'span',
    null,
    announcement
  );
};

SearchMetrics.propTypes = process.env.NODE_ENV !== "production" ? {
  time: _propTypes2.default.number,
  total: _propTypes2.default.number
} : {};

exports.default = SearchMetrics;
module.exports = exports['default'];