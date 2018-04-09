'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
(0, _react3.storiesOf)('Login', module).add('default', function () {
  return _react2.default.createElement(_Login2.default, { submitLogin: (0, _addonActions.action)('submitLogin') });
});