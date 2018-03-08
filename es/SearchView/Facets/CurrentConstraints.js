import React from 'react';
import PropTypes from 'prop-types';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../../animations/Fade';

// TODO: truncate values with a truncateLength option
var CurrentConstraints = function CurrentConstraints(_ref) {
  var constraints = _ref.constraints,
      removeConstraint = _ref.removeConstraint;
  return React.createElement(
    TransitionGroup,
    { className: 'chiclets', appear: true },
    Object.keys(constraints).map(function (constraintName) {
      var andValues = constraints[constraintName].and || [];
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        React.createElement(
          Fade,
          { key: constraintName },
          React.createElement(
            'div',
            { style: { marginBottom: '10px' } },
            andValues.map(function (value) {
              return React.createElement(
                'div',
                {
                  key: constraintName + value.name,
                  className: 'btn btn-success btn-raised',
                  onClick: removeConstraint.bind(null, constraintName, value.name)
                },
                React.createElement(
                  'span',
                  { title: value.name },
                  constraintName,
                  ': ',
                  value.name,
                  ' '
                ),
                React.createElement('span', { className: 'glyphicon glyphicon-remove-circle icon-white' })
              );
            })
          )
        )
      );
    })
  );
};

CurrentConstraints.propTypes = process.env.NODE_ENV !== "production" ? {
  constraints: PropTypes.object.isRequired,
  removeConstraint: PropTypes.func.isRequired
} : {};

export default CurrentConstraints;