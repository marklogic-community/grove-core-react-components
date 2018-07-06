'use strict';

exports.__esModule = true;
exports.defaultNonSelectedFacets = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _Facets = require('./Facets');

var _Facets2 = _interopRequireDefault(_Facets);

var _shared = require('./shared');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import filter from 'lodash/filter';
// import omit from 'lodash/omit';

var defaultNonSelectedFacets = exports.defaultNonSelectedFacets = {
  Example: { facetValues: _shared.defaultValues },
  AnotherExample: { facetValues: _shared.defaultValues }
};

// TODO: update to new activeFilters shape
// class InteractiveFacets extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeFilters: [],
//       availableFilters: defaultNonSelectedFacets
//     };
//   }

//   render() {
//     return (
//       <div className="col-md-3">
//         <Facets
//           activeFilters={this.state.activeFilters}
//           availableFilters={this.state.availableFilters}
//           addFilter={(facetName, value) => {
//             this.setState({
//               activeFilters: {
//                 ...this.state.activeFilters,
//                 [facetName]: { and: [{ name: value, value: value }] }
//               },
//               availableFilters: {
//                 ...this.state.availableFilters,
//                 [facetName]: {
//                   facetValues: filter(defaultValues, {
//                     name: value,
//                     value: value
//                   })
//                 }
//               }
//             });
//           }}
//           removeFilter={facetName => {
//             this.setState({
//               activeFilters: omit(this.state.activeFilters, facetName),
//               availableFilters: {
//                 ...this.state.availableFilters,
//                 [facetName]: {
//                   facetValues: defaultValues
//                 }
//               }
//             });
//           }}
//         />
//       </div>
//     );
//   }
// }

/* global module */
(0, _react3.storiesOf)('SearchView/Facets', module).add('default', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-3' },
    _react2.default.createElement(_Facets2.default, {
      activeFilters: [],
      availableFilters: defaultNonSelectedFacets,
      addFilter: (0, _addonActions.action)('addFilter'),
      removeFilter: (0, _addonActions.action)('removeFilter')
    })
  );
}).add('with a selection', function () {
  return _react2.default.createElement(
    'div',
    { className: 'col-md-3' },
    _react2.default.createElement(_Facets2.default, {
      activeFilters: [{
        constraint: 'Example',
        value: ['First']
      }],
      availableFilters: defaultNonSelectedFacets,
      addFilter: (0, _addonActions.action)('addFilter'),
      removeFilter: (0, _addonActions.action)('removeFilter')
    })
  );
});
// .add('interactive', () => <InteractiveFacets />);