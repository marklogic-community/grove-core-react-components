'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _reactRouterDom = require('react-router-dom');

var _SearchView = require('./SearchView');

var _SearchView2 = _interopRequireDefault(_SearchView);

var _mockData = require('./test/mockData');

var _Facets = require('./Facets/Facets.story');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView', module).add('displaying results', function () {
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(_SearchView2.default, {
      stagedSearch: {},
      queryText: '',
      handleQueryTextChange: (0, _addonActions.action)('handleQueryTextChange'),
      runSearch: (0, _addonActions.action)('runSearch'),
      facets: _Facets.defaultNonSelectedFacets,
      addFilter: (0, _addonActions.action)('addFilter'),
      activeFilters: [],
      removeFilter: (0, _addonActions.action)('removeFilter'),
      isSearchComplete: true,
      total: 209,
      results: _mockData.mockResults,
      executionTime: 0.01232324,
      totalPages: 21,
      page: 1,
      changePage: (0, _addonActions.action)('changePage'),
      handlePageSelection: (0, _addonActions.action)('handlePageSelection'),
      showMore: (0, _addonActions.action)('showMore')
    })
  );
}); /* global module */