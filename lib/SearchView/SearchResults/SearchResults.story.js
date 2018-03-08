'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _reactRouterDom = require('react-router-dom');

var _SearchResults = require('./SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _mockData = require('../test/mockData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/SearchResponseView/SearchResults', module).add('with results', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      { className: 'col-md-12' },
      _react2.default.createElement(_SearchResults2.default, { results: _mockData.mockResults })
    )
  );
}).add('with no results', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      { className: 'col-md-12' },
      _react2.default.createElement(_SearchResults2.default, { results: [] })
    )
  );
});

// TODO: can we get rid of this router dependency?
/* global module */