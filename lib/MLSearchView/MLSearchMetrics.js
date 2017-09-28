'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchMetrics = function MLSearchMetrics(_ref) {
  var time = _ref.time,
      total = _ref.total;

  return _react2.default.createElement(
    'span',
    null,
    'Found ',
    total,
    ' results in ',
    time.toFixed(3),
    ' seconds.'
  );
};

MLSearchMetrics.propTypes = process.env.NODE_ENV !== "production" ? {
  time: _propTypes2.default.number.isRequired,
  total: _propTypes2.default.number.isRequired
} : {};

exports.default = MLSearchMetrics;
module.exports = exports['default'];