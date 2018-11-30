'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _DetailView = require('./DetailView');

var _DetailView2 = _interopRequireDefault(_DetailView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
var detail = {
  label: 'sample.json',
  address: '588 Pierrepont Street, Inkerman, Michigan, 1536',
  age: 65,
  balance: '$93,416.31',
  company: 'PIGZART',
  favoriteFruit: 'banana'
};

(0, _react3.storiesOf)('DetailView', module).add('default', function () {
  return _react2.default.createElement(_DetailView2.default, {
    detail: detail,
    contentType: 'application/json',
    loadDetail: (0, _addonActions.action)('loadDetail'),
    uri: 'sample.json'
  });
});