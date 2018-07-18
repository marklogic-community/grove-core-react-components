'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _reactRouterDom = require('react-router-dom');

var _SearchResponseView = require('./SearchResponseView');

var _SearchResponseView2 = _interopRequireDefault(_SearchResponseView);

var _mockData = require('./test/mockData.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global module */
(0, _react3.storiesOf)('SearchView/SearchResponseView', module).add('with results', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      { className: 'col-md-12' },
      _react2.default.createElement(_SearchResponseView2.default, {
        results: _mockData.mockResults,
        executionTime: 10.3456,
        total: 99,
        page: 1,
        totalPages: 10,
        handlePageSelection: (0, _addonActions.action)('handlePageSelection')
      })
    )
  );
}).add('with no results', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-12' },
    _react2.default.createElement(_SearchResponseView2.default, { results: [], total: 0, executionTime: 9.9808 })
  );
}).add('with an error', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-12' },
    _react2.default.createElement(_SearchResponseView2.default, { error: 'ERROR: This is an error.' })
  );
});

// TODO: with results, error


// TODO: can we get rid of this router dependency?