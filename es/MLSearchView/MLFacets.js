import React from 'react';

var MLFacets = function MLFacets(_ref) {
  var activeConstraints = _ref.activeConstraints,
      nonSelectedFacets = _ref.nonSelectedFacets,
      addConstraint = _ref.addConstraint,
      removeConstraint = _ref.removeConstraint;
  return React.createElement(
    "div",
    { className: "ml-facet-list list-group" },
    !!activeConstraints && React.createElement(
      "div",
      { className: "chiclets" },
      Object.keys(activeConstraints).map(function (constraintName) {
        return (
          // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
          React.createElement(
            "div",
            { key: constraintName },

            // TODO: truncate values with a truncateLength option
            activeConstraints[constraintName].map(function (value) {
              return React.createElement(
                "div",
                { key: value, className: "btn btn-primary" },
                React.createElement(
                  "span",
                  { title: value.name },
                  constraintName,
                  ": ",
                  value.name
                ),
                React.createElement("span", {
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
      return React.createElement(
        "div",
        { key: facetName, className: "ml-facet list-group-item" },
        React.createElement(
          "h3",
          { className: "list-group-item-heading" },
          facetName
        ),
        nonSelectedFacets[facetName].facetValues.map(function (value) {
          return React.createElement(
            "div",
            { key: value.name },
            React.createElement("i", {
              className: "glyphicon glyphicon-plus-sign ml-facet-add-pos",
              onClick: addConstraint.bind(null, facetName, value.name)
            }),
            React.createElement(
              "span",
              { title: value.name },
              value.name
            ),
            React.createElement(
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

export default MLFacets;