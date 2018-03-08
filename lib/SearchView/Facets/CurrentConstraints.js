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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: truncate values with a truncateLength option
var CurrentConstraints = function CurrentConstraints(_ref) {
  var constraints = _ref.constraints,
      removeConstraint = _ref.removeConstraint;
  return _react2.default.createElement(
    _TransitionGroup2.default,
    { className: 'chiclets', appear: true },
    Object.keys(constraints).map(function (constraintName) {
      var andValues = constraints[constraintName].and || [];
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        _react2.default.createElement(
          _Fade2.default,
          { key: constraintName },
          _react2.default.createElement(
            'div',
            { style: { marginBottom: '10px' } },
            andValues.map(function (value) {
              return _react2.default.createElement(
                'div',
                {
                  key: constraintName + value.name,
                  className: 'btn btn-success btn-raised',
                  onClick: removeConstraint.bind(null, constraintName, value.name)
                },
                _react2.default.createElement(
                  'span',
                  { title: value.name },
                  constraintName,
                  ': ',
                  value.name,
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

CurrentConstraints.propTypes = process.env.NODE_ENV !== "production" ? {
  constraints: _propTypes2.default.object.isRequired,
  removeConstraint: _propTypes2.default.func.isRequired
} : {};

exports.default = CurrentConstraints;
module.exports = exports['default'];