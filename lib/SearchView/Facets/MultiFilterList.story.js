'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _MultiFilterList = require('./MultiFilterList');

var _MultiFilterList2 = _interopRequireDefault(_MultiFilterList);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/Facets/MultiFilterList', module).add('default', function () {
  return _react2.default.createElement(_MultiFilterList2.default, {
    values: _shared.defaultValues,
    addFilter: (0, _addonActions.action)('addFilter')
  });
}).add('with a selection', function () {
  return _react2.default.createElement(_MultiFilterList2.default, {
    values: _shared.defaultValues,
    selectedValues: [{ value: 'First' }],
    addFilter: (0, _addonActions.action)('addFilter'),
    removeFilter: (0, _addonActions.action)('removeFilter')
  });
}); /* global module */