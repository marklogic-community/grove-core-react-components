'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CurrentFilters = require('./CurrentFilters');

var _CurrentFilters2 = _interopRequireDefault(_CurrentFilters);

var _SingleFilterList = require('./SingleFilterList');

var _SingleFilterList2 = _interopRequireDefault(_SingleFilterList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
var Facets = function Facets(_ref) {
  var activeFilters = _ref.activeFilters,
      availableFilters = _ref.availableFilters,
      addFilter = _ref.addFilter,
      removeFilter = _ref.removeFilter,
      showMore = _ref.showMore,
      stagedSearch = _ref.stagedSearch,
      queryText = _ref.queryText;
  return _react2.default.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    activeFilters.length > 0 && _react2.default.createElement(_CurrentFilters2.default, { filters: activeFilters, removeFilter: removeFilter }),
    availableFilters && Object.keys(availableFilters).filter(function (facetName) {
      return availableFilters[facetName].facetValues;
    }).map(function (facetName) {
      var selectedValues = void 0;
      var activeFilter = activeFilters.find(function (filter) {
        return filter.constraint === facetName;
      });
      if (activeFilter) {
        selectedValues = activeFilter.value;
      }
      return _react2.default.createElement(
        'div',
        { key: facetName, className: 'panel panel-primary ml-facet' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement(
            'h3',
            { className: 'panel-title' },
            facetName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _react2.default.createElement(_SingleFilterList2.default, {
            values: availableFilters[facetName].facetValues,
            selectedValues: selectedValues,
            addFilter: addFilter.bind(null, facetName, availableFilters[facetName].type || null),
            removeFilter: removeFilter.bind(null, facetName)
          }),
          _react2.default.createElement(
            'span',
            {
              onClick: showMore.bind(null, facetName, availableFilters[facetName].facetValues, availableFilters[facetName].type || null, stagedSearch, queryText),
              style: { cursor: 'pointer' }
            },
            'Show more'
          )
        )
      );
    })
  );
};

Facets.propTypes = process.env.NODE_ENV !== "production" ? {
  activeFilters: _propTypes2.default.array.isRequired,
  addFilter: _propTypes2.default.func.isRequired,
  availableFilters: _propTypes2.default.object,
  removeFilter: _propTypes2.default.func.isRequired,
  showMore: _propTypes2.default.func.isRequired,
  stagedSearch: _propTypes2.default.object.isRequired,
  queryText: _propTypes2.default.string.isRequired
} : {};

exports.default = Facets;
module.exports = exports['default'];