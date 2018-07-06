import React from 'react';
import PropTypes from 'prop-types';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../../animations/Fade';

// TODO: truncate values with a truncateLength option
const CurrentFilters = ({ filters, removeFilter }) => (
  <TransitionGroup className="chiclets" appear={true}>
    {Object.keys(filters).map(constraintName => {
      const andValues = filters[constraintName].and || [];
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        <Fade key={constraintName}>
          <div style={{ marginBottom: '10px' }}>
            {andValues.map(value => (
              <div
                key={constraintName + value.name}
                className="btn btn-success btn-raised"
                onClick={removeFilter.bind(
                  null,
                  constraintName,
                  value.name
                )}
              >
                <span title={value.name}>
                  {constraintName}: {value.name}{' '}
                </span>
                <span className="glyphicon glyphicon-remove-circle icon-white" />
              </div>
            ))}
          </div>
        </Fade>
      );
    })}
  </TransitionGroup>
);

CurrentFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default CurrentFilters;
