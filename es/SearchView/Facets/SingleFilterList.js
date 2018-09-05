import React from 'react';
import PropTypes from 'prop-types';

var SingleFilterList = function SingleFilterList(_ref) {
  var values = _ref.values,
      selectedValues = _ref.selectedValues,
      addFilter = _ref.addFilter,
      removeFilter = _ref.removeFilter;
  return React.createElement(
    'div',
    null,
    selectedValues && React.createElement(
      'div',
      { className: 'selectedFilterValues' },
      values.map(function (value) {
        return selectedValues.includes(value.name) && React.createElement(
          'div',
          { key: value.name },
          removeFilter && React.createElement('span', {
            className: 'glyphicon glyphicon-remove-circle icon-white ml-facet-remove-filter',
            onClick: removeFilter.bind(null, value.name),
            style: { cursor: 'pointer' }
          }),
          React.createElement(
            'span',
            { title: value.name },
            ' ',
            value.value
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
    ),
    React.createElement(
      'div',
      { className: 'nonSelectedFilterValues' },
      values.map(function (value) {
        return (!selectedValues || !selectedValues.includes(value.name)) && React.createElement(
          'div',
          { key: value.name },
          React.createElement('i', {
            className: 'glyphicon glyphicon-plus-sign ml-facet-add-pos',
            onClick: addFilter.bind(null, value.name),
            style: { cursor: 'pointer' }
          }),
          React.createElement(
            'span',
            { title: value.name },
            ' ',
            value.value
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
};

SingleFilterList.propTypes = process.env.NODE_ENV !== "production" ? {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    count: PropTypes.number
  })).isRequired,
  selectedValues: PropTypes.array,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func
} : {};

export default SingleFilterList;