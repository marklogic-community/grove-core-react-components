'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _reactRouterDom = require('react-router-dom');

var _addonActions = require('@storybook/addon-actions');

var _CreateView = require('./CreateView');

var _CreateView2 = _interopRequireDefault(_CreateView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('CreateView', module).add('default', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_CreateView2.default, {
      redirectPath: '/detail',
      onCreateExecute: function onCreateExecute() {
        return Promise.resolve((0, _addonActions.action)('onCreateExecute').apply(undefined, arguments));
      }
    })
  );
}); /* global module, Promise */