'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _SingleConstraintList = require('./SingleConstraintList');

var _SingleConstraintList2 = _interopRequireDefault(_SingleConstraintList);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/Facets/SingleConstraintList', module).add('default', function () {
  return _react2.default.createElement(_SingleConstraintList2.default, {
    values: _shared.defaultValues,
    addConstraint: (0, _addonActions.action)('addConstraint')
  });
}).add('with a selection', function () {
  return _react2.default.createElement(_SingleConstraintList2.default, {
    values: _shared.defaultValues,
    selectedValues: [{ value: 'First' }],
    addConstraint: (0, _addonActions.action)('addConstraint'),
    removeConstraint: (0, _addonActions.action)('removeConstraint')
  });
}); /* global module */