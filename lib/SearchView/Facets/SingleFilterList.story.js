'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _SingleFilterList = require('./SingleFilterList');

var _SingleFilterList2 = _interopRequireDefault(_SingleFilterList);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/Facets/SingleFilterList', module).add('default', function () {
  return _react2.default.createElement(_SingleFilterList2.default, { values: _shared.defaultValues, addFilter: (0, _addonActions.action)('addFilter') });
}).add('with a selection', function () {
  return _react2.default.createElement(_SingleFilterList2.default, {
    values: _shared.defaultValues,
    selectedValues: [{ value: 'First' }],
    addFilter: (0, _addonActions.action)('addFilter'),
    removeFilter: (0, _addonActions.action)('removeFilter')
  });
}); /* global module */