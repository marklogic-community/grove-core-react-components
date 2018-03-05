/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import MLFacets from '../src/MLSearchView/MLFacets';
import SingleConstraintList from '../src/MLSearchView/facets/SingleConstraintList';

import filter from 'lodash/filter';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const defaultValues = [
  {
    name: 'First',
    count: 100
  },
  {
    name: 'Second',
    count: 55
  },
  {
    name: 'Third',
    count: 75
  }
];

const defaultNonSelectedFacets = {'Example': {facetValues: defaultValues}};

class MLFacetsWithState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeConstraints: {},
      nonSelectedFacets: defaultNonSelectedFacets
    };
  }

  render() {
    return (
      <div className="col-md-3">
        <MLFacets
          activeConstraints={this.state.activeConstraints}
          nonSelectedFacets={this.state.nonSelectedFacets}
          addConstraint={(facetName, value) => {
            this.setState({
              activeConstraints: {[facetName]: [{name: [value]}]},
              nonSelectedFacets: {
                Example: {
                  facetValues: filter(defaultValues, {name: value})
                }
              }
            });
          }}
          removeConstraint={() => {
            this.setState({
              activeConstraints: {},
              nonSelectedFacets: defaultNonSelectedFacets
            });
          }}
        />
      </div>
    );
  }
}

storiesOf('MLFacets', module)
  .add('default', () => (
    <MLFacetsWithState />
  ));

storiesOf('SingleConstraintList', module)
  .add('default', () => (
    <div className="col-md-3">
      <div className="panel panel-primary ml-facet">
        <div className="panel-heading">
          <h3 className="panel-title">Facet</h3>
        </div>
        <div className="panel-body">
          <SingleConstraintList
            values={defaultValues}
            addConstraint={() => {}}/>
        </div>
      </div>
    </div>
  ));
