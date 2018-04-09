'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _LoginJumbotron = require('./LoginJumbotron');

var _LoginJumbotron2 = _interopRequireDefault(_LoginJumbotron);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
(0, _react3.storiesOf)('Login/LoginJumbotron', module).add('default', function () {
  return _react2.default.createElement(_LoginJumbotron2.default, { submitLogin: (0, _addonActions.action)('submitLogin') });
});