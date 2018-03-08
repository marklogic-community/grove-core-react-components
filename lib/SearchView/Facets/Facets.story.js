'use strict';

exports.__esModule = true;
exports.defaultNonSelectedFacets = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _Facets = require('./Facets');

var _Facets2 = _interopRequireDefault(_Facets);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global module */


var defaultNonSelectedFacets = exports.defaultNonSelectedFacets = {
  Example: { facetValues: _shared.defaultValues },
  AnotherExample: { facetValues: _shared.defaultValues }
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

    return _react2.default.createElement(
      'div',
      { className: 'col-md-3' },
      _react2.default.createElement(_Facets2.default, {
        activeConstraints: this.state.activeConstraints,
        availableConstraints: this.state.availableConstraints,
        addConstraint: function addConstraint(facetName, value) {
          var _extends2, _extends3;

          _this2.setState({
            activeConstraints: _extends({}, _this2.state.activeConstraints, (_extends2 = {}, _extends2[facetName] = { and: [{ name: value, value: value }] }, _extends2)),
            availableConstraints: _extends({}, _this2.state.availableConstraints, (_extends3 = {}, _extends3[facetName] = {
              facetValues: (0, _filter2.default)(_shared.defaultValues, {
                name: value,
                value: value
              })
            }, _extends3))
          });
        },
        removeConstraint: function removeConstraint(facetName) {
          var _extends4;

          _this2.setState({
            activeConstraints: (0, _omit2.default)(_this2.state.activeConstraints, facetName),
            availableConstraints: _extends({}, _this2.state.availableConstraints, (_extends4 = {}, _extends4[facetName] = {
              facetValues: _shared.defaultValues
            }, _extends4))
          });
        }
      })
    );
  };

  return InteractiveFacets;
}(_react2.default.Component);

(0, _react3.storiesOf)('SearchView/Facets', module).add('default', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-3' },
    _react2.default.createElement(_Facets2.default, {
      activeConstraints: {},
      availableConstraints: defaultNonSelectedFacets,
      addConstraint: (0, _addonActions.action)('addConstraint'),
      removeConstraint: (0, _addonActions.action)('removeConstraint')
    })
  );
}).add('with a selection', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-3' },
    _react2.default.createElement(_Facets2.default, {
      activeConstraints: {
        Example: { and: [{ name: 'First', value: 'First' }] }
      },
      availableConstraints: defaultNonSelectedFacets,
      addConstraint: (0, _addonActions.action)('addConstraint'),
      removeConstraint: (0, _addonActions.action)('removeConstraint')
    })
  );
}).add('interactive', function () {
  return _react2.default.createElement(InteractiveFacets, null);
});