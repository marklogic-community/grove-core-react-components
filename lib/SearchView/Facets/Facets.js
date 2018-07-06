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
      removeFilter = _ref.removeFilter;
  return _react2.default.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    activeFilters.length > 0 && _react2.default.createElement(_CurrentFilters2.default, {
      filters: activeFilters,
      removeFilter: removeFilter
    }),
    availableFilters && Object.keys(availableFilters).map(function (facetName) {
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
            selectedValues: activeFilters[facetName] && activeFilters[facetName].and,
            addFilter: addFilter.bind(null, facetName),
            removeFilter: removeFilter.bind(null, facetName)
          })
        )
      );
    })
  );
};

Facets.propTypes = process.env.NODE_ENV !== "production" ? {
  activeFilters: _propTypes2.default.array.isRequired,
  addFilter: _propTypes2.default.func.isRequired,
  removeFilter: _propTypes2.default.func.isRequired
} : {};

exports.default = Facets;
module.exports = exports['default'];