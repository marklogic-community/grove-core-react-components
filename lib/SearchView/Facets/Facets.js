'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CurrentConstraints = require('./CurrentConstraints');

var _CurrentConstraints2 = _interopRequireDefault(_CurrentConstraints);

var _SingleConstraintList = require('./SingleConstraintList');

var _SingleConstraintList2 = _interopRequireDefault(_SingleConstraintList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
var Facets = function Facets(_ref) {
  var activeConstraints = _ref.activeConstraints,
      availableConstraints = _ref.availableConstraints,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return _react2.default.createElement(
    'div',
    { className: 'ml-facet-list list-group' },
    !!activeConstraints && _react2.default.createElement(_CurrentConstraints2.default, {
      constraints: activeConstraints,
      removeConstraint: removeConstraint
    }),
    availableConstraints && Object.keys(availableConstraints).map(function (facetName) {
      return _react2.default.createElement(
        'div',
        { key: facetName, className: 'panel panel-primary ml-facet' },
        _react2.default.createElement(
          'div',
          { className: 'panel-heading' },
          _react2.default.createElement(
            'h3',
            { className: 'panel-title' },
            facetName
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'panel-body' },
          _react2.default.createElement(_SingleConstraintList2.default, {
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
  activeConstraints: _propTypes2.default.object.isRequired,
  addConstraint: _propTypes2.default.func.isRequired,
  removeConstraint: _propTypes2.default.func.isRequired
} : {};

exports.default = Facets;
module.exports = exports['default'];