import React from 'react';
import PropTypes from 'prop-types';

import CurrentFilters from './CurrentFilters';
import SingleFilterList from './SingleFilterList';

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
const Facets = ({
  activeFilters,
  availableFilters,
  addFilter,
  removeFilter
}) => (
  <div className="ml-facet-list list-group">
    {
      // TODO - this was when facets should be negatible?
      // Example of passing in attribute to change component behavior?
      // <ml-chiclets
      //   ng-if="shouldNegate"
      //   active-facets="activeFacets"
      //   toggle="toggle({facet:facet, value:value})"
      //   truncate="{{ truncateLength }}"></ml-chiclets>
    }
    {!!activeFilters && (
      <CurrentFilters
        filters={activeFilters}
        removeFilter={removeFilter}
      />
    )}
    {availableFilters &&
      Object.keys(availableFilters).map(facetName => (
        <div key={facetName} className="panel panel-primary ml-facet">
          <div className="panel-heading">
            <h3 className="panel-title">{facetName}</h3>
          </div>
          <div className="panel-body">
            <SingleFilterList
              values={availableFilters[facetName].facetValues}
              selectedValues={
                activeFilters[facetName] && activeFilters[facetName].and
              }
              addFilter={addFilter.bind(null, facetName)}
              removeFilter={removeFilter.bind(null, facetName)}
            />
          </div>
        </div>
      ))}
  </div>
);

Facets.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default Facets;
