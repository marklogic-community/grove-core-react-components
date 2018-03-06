import React from 'react';
import PropTypes from 'prop-types';

import CurrentConstraints from './CurrentConstraints';
import SingleConstraintList from './SingleConstraintList';

const Facets = ({
  activeConstraints, availableConstraints,
  addConstraint, removeConstraint
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
    {
      !!activeConstraints &&
        <CurrentConstraints
          constraints={activeConstraints}
          removeConstraint={removeConstraint}
        />
    }
    {
      // TODO: truncate names with a truncateLength option
      // TODO: handle blanks before it gets here
      availableConstraints &&
      Object.keys(availableConstraints).map((facetName) => (
        <div key={facetName} className="panel panel-primary ml-facet">
          <div className="panel-heading">
            <h3 className="panel-title">{facetName}</h3>
          </div>
          <div className="panel-body">
            <SingleConstraintList
              values={availableConstraints[facetName].facetValues}
              selectedValues={activeConstraints[facetName]}
              addConstraint={addConstraint.bind(null, facetName)}
              removeConstraint={removeConstraint.bind(null, facetName)}
            />
          </div>
        </div>
      ))
    }
  </div>
);

Facets.propTypes = {
  activeConstraints: PropTypes.object.isRequired,
  addConstraint: PropTypes.func.isRequired,
  removeConstraint: PropTypes.func.isRequired
};

export default Facets;
