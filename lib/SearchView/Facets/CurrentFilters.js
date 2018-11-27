'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _Fade = require('../../animations/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: truncate values with a truncateLength option
var CurrentFilters = function CurrentFilters(_ref) {
  var filters = _ref.filters,
      removeFilter = _ref.removeFilter;
  return _react2.default.createElement(
    _TransitionGroup2.default,
    { className: 'chiclets', appear: true },
    filters.map(function (filter) {
      if ((0, _lodash.some)(filter.value, function (value) {
        return !(typeof value === 'string' || typeof value === 'number');
      })) {
        return null;
      }
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        _react2.default.createElement(
          _Fade2.default,
          { key: filter.constraint },
          _react2.default.createElement(
            'div',
            {
              style: { marginBottom: '10px' },
              className: 'grove-current-filter'
            },
            filter.value.map(function (value) {
              return _react2.default.createElement(
                'div',
                {
                  key: filter.constraint + value,
                  className: 'btn btn-success btn-raised',
                  onClick: removeFilter.bind(null, filter.constraint, value)
                },
                _react2.default.createElement(
                  'span',
                  { title: value },
                  filter.constraint,
                  ': ',
                  value,
                  ' '
                ),
                _react2.default.createElement('span', { className: 'glyphicon glyphicon-remove-circle icon-white' })
              );
            })
          )
        )
      );
    })
  );
};

CurrentFilters.propTypes = process.env.NODE_ENV !== "production" ? {
  filters: _propTypes2.default.array.isRequired,
  removeFilter: _propTypes2.default.func.isRequired
} : {};

exports.default = CurrentFilters;
module.exports = exports['default'];