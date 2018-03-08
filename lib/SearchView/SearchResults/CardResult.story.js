'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _reactRouterDom = require('react-router-dom');

var _CardResult = require('./CardResult');

var _CardResult2 = _interopRequireDefault(_CardResult);

var _mockData = require('../test/mockData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/SearchResponseView/SearchResults/CardResult', module).add('with label', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_CardResult2.default, { result: _mockData.mockResults[0] })
  );
}).add('with long text', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_CardResult2.default, { result: _mockData.mockResults[2] })
  );
}).add('without label', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_CardResult2.default, { result: _mockData.mockResults[3] })
  );
});

// TODO: can we get rid of this router dependency?
/* global module */