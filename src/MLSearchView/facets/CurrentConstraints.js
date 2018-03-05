import React from 'react';
import PropTypes from 'prop-types';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../../animations/Fade';

const CurrentConstraints = ({constraints, removeConstraint}) => (
  <TransitionGroup className="chiclets" appear={true}>
    {
      Object.keys(constraints).map((constraintName) => (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        <Fade key={constraintName}>
          <div>
            {
              // TODO: truncate values with a truncateLength option
              constraints[constraintName].map((value) => (
                <div key={constraintName + value.name} className="btn btn-success btn-raised">
                  <span title={value.name}>{constraintName}: {value.name} </span>
                  <span
                    className="glyphicon glyphicon-remove-circle icon-white"
                    onClick={removeConstraint.bind(null, constraintName, value.name)}
                  />
                </div>
              ))
            }
          </div>
        </Fade>
      ))
    }
  </TransitionGroup>
);

CurrentConstraints.propTypes = {
  constraints: PropTypes.object.isRequired,
  removeConstraint: PropTypes.func.isRequired
};

export default CurrentConstraints;
