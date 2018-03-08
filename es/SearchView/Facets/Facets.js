import React from 'react';
import PropTypes from 'prop-types';

import CurrentConstraints from './CurrentConstraints';
import SingleConstraintList from './SingleConstraintList';

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
var Facets = function Facets(_ref) {
  var activeConstraints = _ref.activeConstraints,
      availableConstraints = _ref.availableConstraints,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return React.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    !!activeConstraints && React.createElement(CurrentConstraints, {
      constraints: activeConstraints,
      removeConstraint: removeConstraint
    }),
    availableConstraints && Object.keys(availableConstraints).map(function (facetName) {
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
          React.createElement(SingleConstraintList, {
            values: availableConstraints[facetName].facetValues,
            selectedValues: activeConstraints[facetName] && activeConstraints[facetName].and,
            addConstraint: addConstraint.bind(null, facetName),
            removeConstraint: removeConstraint.bind(null, facetName)
          })
        )
      );
    })
  );
};

Facets.propTypes = process.env.NODE_ENV !== "production" ? {
  activeConstraints: PropTypes.object.isRequired,
  addConstraint: PropTypes.func.isRequired,
  removeConstraint: PropTypes.func.isRequired
} : {};

export default Facets;