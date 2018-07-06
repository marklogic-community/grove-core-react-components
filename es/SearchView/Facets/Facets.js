import React from 'react';
import PropTypes from 'prop-types';

import CurrentFilters from './CurrentFilters';
import SingleFilterList from './SingleFilterList';

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
var Facets = function Facets(_ref) {
  var activeFilters = _ref.activeFilters,
      availableFilters = _ref.availableFilters,
      addFilter = _ref.addFilter,
      removeFilter = _ref.removeFilter;
  return React.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    activeFilters.length > 0 && React.createElement(CurrentFilters, {
      filters: activeFilters,
      removeFilter: removeFilter
    }),
    availableFilters && Object.keys(availableFilters).map(function (facetName) {
      return React.createElement(
        'div',
        { key: facetName, className: 'panel panel-primary ml-facet' },
        React.createElement(
          'div',
          { className: 'panel-heading' },
          React.createElement(
            'h3',
            { className: 'panel-title' },
            facetName
          )
        ),
        React.createElement(
          'div',
          { className: 'panel-body' },
          React.createElement(SingleFilterList, {
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
  activeFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
} : {};

export default Facets;