import React from 'react';
import PropTypes from 'prop-types';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../../animations/Fade';

// TODO: truncate values with a truncateLength option
var CurrentFilters = function CurrentFilters(_ref) {
  var filters = _ref.filters,
      removeFilter = _ref.removeFilter;
  return React.createElement(
    TransitionGroup,
    { className: 'chiclets', appear: true },
    filters.map(function (filter) {
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        React.createElement(
          Fade,
          { key: filter.constraint },
          React.createElement(
            'div',
            { style: { marginBottom: '10px' } },
            filter.value.map(function (value) {
              return React.createElement(
                'div',
                {
                  key: filter.constraint + value,
                  className: 'btn btn-success btn-raised',
                  onClick: removeFilter.bind(null, filter.constraint, value)
                },
                React.createElement(
                  'span',
                  { title: value },
                  filter.constraint,
                  ': ',
                  value,
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

CurrentFilters.propTypes = process.env.NODE_ENV !== "production" ? {
  filters: PropTypes.array.isRequired,
  removeFilter: PropTypes.func.isRequired
} : {};

export default CurrentFilters;