/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// import filter from 'lodash/filter';
// import omit from 'lodash/omit';

import Facets from './Facets';

import { defaultValues } from './shared';

export var defaultNonSelectedFacets = {
  Example: { facetValues: defaultValues },
  AnotherExample: { facetValues: defaultValues }
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

storiesOf('SearchView/Facets', module).add('default', function () {
  return React.createElement(
    'div',
    { className: 'col-md-3' },
    React.createElement(Facets, {
      activeFilters: [],
      availableFilters: defaultNonSelectedFacets,
      addFilter: action('addFilter'),
      removeFilter: action('removeFilter')
    })
  );
}).add('with a selection', function () {
  return React.createElement(
    'div',
    { className: 'col-md-3' },
    React.createElement(Facets, {
      activeFilters: [{
        constraint: 'Example',
        value: ['First']
      }],
      availableFilters: defaultNonSelectedFacets,
      addFilter: action('addFilter'),
      removeFilter: action('removeFilter')
    })
  );
});
// .add('interactive', () => <InteractiveFacets />);