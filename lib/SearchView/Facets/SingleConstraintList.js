'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleConstraintList = function SingleConstraintList(_ref) {
  var values = _ref.values,
      selectedValues = _ref.selectedValues,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return _react2.default.createElement(
    'div',
    null,
    selectedValues && _react2.default.createElement(
      'div',
      { className: 'selectedConstraintValues' },
      values.map(function (value) {
        return selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value) && _react2.default.createElement(
          'div',
          { key: value.value },
          removeConstraint && _react2.default.createElement('span', {
            className: 'glyphicon glyphicon-remove-circle icon-white ml-facet-remove-constraint',
            onClick: removeConstraint.bind(null, value.value),
            style: { cursor: 'pointer' }
          }),
          _react2.default.createElement(
            'span',
            { title: value.value },
            ' ',
            value.value
          ),
          _react2.default.createElement(
            'span',
            null,
            ' (',
            value.count,
            ')'
          )
        );
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'nonSelectedConstraintValues' },
      values.map(function (value) {
        return (!selectedValues || !selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value)) && _react2.default.createElement(
          'div',
          { key: value.value },
          _react2.default.createElement('i', {
            className: 'glyphicon glyphicon-plus-sign ml-facet-add-pos',
            onClick: addConstraint.bind(null, value.value),
            style: { cursor: 'pointer' }
          }),
          _react2.default.createElement(
            'span',
            { title: value.value },
            ' ',
            value.value
          ),
          _react2.default.createElement(
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
  values: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    count: _propTypes2.default.number
  })).isRequired,
  selectedValues: _propTypes2.default.array,
  addConstraint: _propTypes2.default.func.isRequired,
  removeConstraint: _propTypes2.default.func
} : {};

exports.default = SingleConstraintList;
module.exports = exports['default'];