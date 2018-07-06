'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _CurrentFilters = require('./CurrentFilters');

var _CurrentFilters2 = _interopRequireDefault(_CurrentFilters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
(0, _react3.storiesOf)('SearchView/Facets/CurrentFilters', module).add('default', function () {
  return (
    // TODO: allow state change
    _react2.default.createElement(_CurrentFilters2.default, {
      filters: [{
        constraint: 'Example',
        value: ['selection1']
      }],
      removeFilter: (0, _addonActions.action)('removeFilter')
    })
  );
});