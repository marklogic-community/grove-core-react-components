'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _SearchMetrics = require('./SearchMetrics');

var _SearchMetrics2 = _interopRequireDefault(_SearchMetrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/SearchResponseView/SearchMetrics', module).add('default', function () {
  return _react2.default.createElement(_SearchMetrics2.default, { time: 0.090908989, total: 1000 });
}).add('without time', function () {
  return _react2.default.createElement(_SearchMetrics2.default, { total: 1000 });
}).add('without total', function () {
  return _react2.default.createElement(_SearchMetrics2.default, { time: 0.090908989 });
}).add('with nothing', function () {
  return _react2.default.createElement(_SearchMetrics2.default, null);
}); /* global module */