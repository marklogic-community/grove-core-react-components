import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../animations/Fade';

var MLFacets = function MLFacets(_ref) {
  var activeConstraints = _ref.activeConstraints,
      nonSelectedFacets = _ref.nonSelectedFacets,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return React.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    !!activeConstraints && React.createElement(
      TransitionGroup,
      { className: 'chiclets', appear: true },
      Object.keys(activeConstraints).map(function (constraintName) {
        return (
          // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
          React.createElement(
            Fade,
            { key: constraintName },
            React.createElement(
              'div',
              { key: constraintName },

              // TODO: truncate values with a truncateLength option
              activeConstraints[constraintName].map(function (value) {
                return React.createElement(
                  'div',
                  { key: value, className: 'btn btn-success btn-raised' },
                  React.createElement(
                    'span',
                    { title: value.name },
                    constraintName,
                    ': ',
                    value.name,
                    ' '
                  ),
                  React.createElement('span', {
                    className: 'glyphicon glyphicon-remove-circle icon-white',
                    onClick: removeConstraint.bind(null, constraintName, value.name)
                  })
                );
              })
            )
          )
        );
      })
    ),

    // TODO: truncate names with a truncateLength option
    // TODO: handle blanks before it gets here
    nonSelectedFacets && Object.keys(nonSelectedFacets).map(function (facetName) {
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
          nonSelectedFacets[facetName].facetValues.map(function (value) {
            return React.createElement(
              'div',
              { key: value.name },
              React.createElement('i', {
                className: 'glyphicon glyphicon-plus-sign ml-facet-add-pos',
                onClick: addConstraint.bind(null, facetName, value.name)
              }),
              React.createElement(
                'span',
                { title: value.name },
                ' ',
                value.name
              ),
              React.createElement(
                'span',
                null,
                ' (',
                value.count,
                ')'
              )
            );
          })
        )
      );
    })
  );
};

export default MLFacets;