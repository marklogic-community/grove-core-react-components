'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _CurrentConstraints = require('./CurrentConstraints');

var _CurrentConstraints2 = _interopRequireDefault(_CurrentConstraints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
(0, _react3.storiesOf)('SearchView/Facets/CurrentConstraints', module).add('default', function () {
  return (
    // TODO: allow state change
    _react2.default.createElement(_CurrentConstraints2.default, {
      constraints: { Example: { and: [{ name: 'selection1' }] } },
      removeConstraint: (0, _addonActions.action)('removeConstraint')
    })
  );
});