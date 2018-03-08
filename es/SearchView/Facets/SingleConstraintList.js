import React from 'react';
import PropTypes from 'prop-types';

var SingleConstraintList = function SingleConstraintList(_ref) {
  var values = _ref.values,
      selectedValues = _ref.selectedValues,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return React.createElement(
    'div',
    null,
    selectedValues && React.createElement(
      'div',
      { className: 'selectedConstraintValues' },
      values.map(function (value) {
        return selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value) && React.createElement(
          'div',
          { key: value.value },
          removeConstraint && React.createElement('span', {
            className: 'glyphicon glyphicon-remove-circle icon-white ml-facet-remove-constraint',
            onClick: removeConstraint.bind(null, value.value),
            style: { cursor: 'pointer' }
          }),
          React.createElement(
            'span',
            { title: value.value },
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
      { className: 'nonSelectedConstraintValues' },
      values.map(function (value) {
        return (!selectedValues || !selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value)) && React.createElement(
          'div',
          { key: value.value },
          React.createElement('i', {
            className: 'glyphicon glyphicon-plus-sign ml-facet-add-pos',
            onClick: addConstraint.bind(null, value.value),
            style: { cursor: 'pointer' }
          }),
          React.createElement(
            'span',
            { title: value.value },
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

SingleConstraintList.propTypes = process.env.NODE_ENV !== "production" ? {
  values: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    count: PropTypes.number
  })).isRequired,
  selectedValues: PropTypes.array,
  addConstraint: PropTypes.func.isRequired,
  removeConstraint: PropTypes.func
} : {};

export default SingleConstraintList;