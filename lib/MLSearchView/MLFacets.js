"use strict";

exports.__esModule = true;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLFacets = function MLFacets(_ref) {
  var activeConstraints = _ref.activeConstraints,
      nonSelectedFacets = _ref.nonSelectedFacets,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return _react2.default.createElement(
    "div",
    { className: "ml-facet-list list-group" },
    !!activeConstraints && _react2.default.createElement(
      "div",
      { className: "chiclets" },
      Object.keys(activeConstraints).map(function (constraintName) {
        return (
          // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
          _react2.default.createElement(
            "div",
            { key: constraintName },

            // TODO: truncate values with a truncateLength option
            activeConstraints[constraintName].map(function (value) {
              return _react2.default.createElement(
                "div",
                { key: value, className: "btn btn-primary" },
                _react2.default.createElement(
                  "span",
                  { title: value.name },
                  constraintName,
                  ": ",
                  value.name
                ),
                _react2.default.createElement("span", {
                  className: "glyphicon glyphicon-remove-circle icon-white",
                  onClick: removeConstraint.bind(null, constraintName, value.name)
                })
              );
            })
          )
        );
      })
    ),

    // TODO: truncate names with a truncateLength option
    // TODO: handle blanks before it gets here
    nonSelectedFacets && Object.keys(nonSelectedFacets).map(function (facetName) {
      return _react2.default.createElement(
        "div",
        { key: facetName, className: "ml-facet list-group-item" },
        _react2.default.createElement(
          "h3",
          { className: "list-group-item-heading" },
          facetName
        ),
        nonSelectedFacets[facetName].facetValues.map(function (value) {
          return _react2.default.createElement(
            "div",
            { key: value.name },
            _react2.default.createElement("i", {
              className: "glyphicon glyphicon-plus-sign ml-facet-add-pos",
              onClick: addConstraint.bind(null, facetName, value.name)
            }),
            _react2.default.createElement(
              "span",
              { title: value.name },
              value.name
            ),
            _react2.default.createElement(
              "span",
              null,
              "(",
              value.count,
              ")"
            )
          );
        })
      );
    })
  );
};

exports.default = MLFacets;
module.exports = exports["default"];