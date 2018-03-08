var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import filter from 'lodash/filter';
import omit from 'lodash/omit';

import Facets from './Facets';

import { defaultValues } from './shared';

export var defaultNonSelectedFacets = {
  Example: { facetValues: defaultValues },
  AnotherExample: { facetValues: defaultValues }
};

var InteractiveFacets = function (_React$Component) {
  _inherits(InteractiveFacets, _React$Component);

  function InteractiveFacets(props) {
    _classCallCheck(this, InteractiveFacets);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      activeConstraints: {},
      availableConstraints: defaultNonSelectedFacets
    };
    return _this;
  }

  InteractiveFacets.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { className: 'col-md-3' },
      React.createElement(Facets, {
        activeConstraints: this.state.activeConstraints,
        availableConstraints: this.state.availableConstraints,
        addConstraint: function addConstraint(facetName, value) {
          var _extends2, _extends3;

          _this2.setState({
            activeConstraints: _extends({}, _this2.state.activeConstraints, (_extends2 = {}, _extends2[facetName] = { and: [{ name: value, value: value }] }, _extends2)),
            availableConstraints: _extends({}, _this2.state.availableConstraints, (_extends3 = {}, _extends3[facetName] = {
              facetValues: filter(defaultValues, {
                name: value,
                value: value
              })
            }, _extends3))
          });
        },
        removeConstraint: function removeConstraint(facetName) {
          var _extends4;

          _this2.setState({
            activeConstraints: omit(_this2.state.activeConstraints, facetName),
            availableConstraints: _extends({}, _this2.state.availableConstraints, (_extends4 = {}, _extends4[facetName] = {
              facetValues: defaultValues
            }, _extends4))
          });
        }
      })
    );
  };

  return InteractiveFacets;
}(React.Component);

storiesOf('SearchView/Facets', module).add('default', function () {
  return React.createElement(
    'div',
    { className: 'col-md-3' },
    React.createElement(Facets, {
      activeConstraints: {},
      availableConstraints: defaultNonSelectedFacets,
      addConstraint: action('addConstraint'),
      removeConstraint: action('removeConstraint')
    })
  );
}).add('with a selection', function () {
  return React.createElement(
    'div',
    { className: 'col-md-3' },
    React.createElement(Facets, {
      activeConstraints: {
        Example: { and: [{ name: 'First', value: 'First' }] }
      },
      availableConstraints: defaultNonSelectedFacets,
      addConstraint: action('addConstraint'),
      removeConstraint: action('removeConstraint')
    })
  );
}).add('interactive', function () {
  return React.createElement(InteractiveFacets, null);
});