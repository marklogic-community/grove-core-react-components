'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleFilterList = function SingleFilterList(_ref) {
  var values = _ref.values,
      selectedValues = _ref.selectedValues,
      addFilter = _ref.addFilter,
      removeFilter = _ref.removeFilter;
  return _react2.default.createElement(
    'div',
    null,
    selectedValues && _react2.default.createElement(
      'div',
      { className: 'selectedFilterValues' },
      values.map(function (value) {
        return selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value) && _react2.default.createElement(
          'div',
          { key: value.value },
          removeFilter && _react2.default.createElement('span', {
            className: 'glyphicon glyphicon-remove-circle icon-white ml-facet-remove-filter',
            onClick: removeFilter.bind(null, value.value),
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
      { className: 'nonSelectedFilterValues' },
      values.map(function (value) {
        return (!selectedValues || !selectedValues.map(function (v) {
          return v.value;
        }).includes(value.value)) && _react2.default.createElement(
          'div',
          { key: value.value },
          _react2.default.createElement('i', {
            className: 'glyphicon glyphicon-plus-sign ml-facet-add-pos',
            onClick: addFilter.bind(null, value.value),
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

SingleFilterList.propTypes = process.env.NODE_ENV !== "production" ? {
  values: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    count: _propTypes2.default.number
  })).isRequired,
  selectedValues: _propTypes2.default.array,
  addFilter: _propTypes2.default.func.isRequired,
  removeFilter: _propTypes2.default.func
} : {};

exports.default = SingleFilterList;
module.exports = exports['default'];