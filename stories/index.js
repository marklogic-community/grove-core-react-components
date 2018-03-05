/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import MLFacets from '../src/MLSearchView/MLFacets';
import CurrentConstraints from '../src/MLSearchView/facets/CurrentConstraints';
import SingleConstraintList from '../src/MLSearchView/facets/SingleConstraintList';

import filter from 'lodash/filter';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const defaultValues = [
  {
    name: 'First',
    value: 'First',
    count: 100
  },
  {
    name: 'Second',
    value: 'Second',
    count: 55
  },
  {
    name: 'Third',
    value: 'Third',
    count: 75
  }
];

const defaultNonSelectedFacets = { Example: { facetValues: defaultValues } };

class MLFacetsWithState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeConstraints: {},
      availableConstraints: defaultNonSelectedFacets
    };
  }

  render() {
    return (
      <div className="col-md-3">
        <MLFacets
          activeConstraints={this.state.activeConstraints}
          availableConstraints={this.state.availableConstraints}
          addConstraint={(facetName, value) => {
            this.setState({
              activeConstraints: {
                [facetName]: [{ name: value, value: value }]
              },
              availableConstraints: {
                Example: {
                  facetValues: filter(defaultValues, {
                    name: value,
                    value: value
                  })
                }
              }
            });
          }}
          removeConstraint={() => {
            this.setState({
              activeConstraints: {},
              availableConstraints: defaultNonSelectedFacets
            });
          }}
        />
      </div>
    );
  }
}

storiesOf('MLFacets', module).add('default', () => <MLFacetsWithState />);

storiesOf('CurrentConstraints', module).add('default', () => (
  // TODO: allow state change
  <CurrentConstraints
    constraints={{ Example: [{ value: 'selection1', name: 'selection1' }] }}
    removeConstraint={() => {}}
  />
));

storiesOf('SingleConstraintList', module).add('default', () => (
  // TODO: allow state change
  <div className="col-md-3">
    <div className="panel panel-primary ml-facet">
      <div className="panel-heading">
        <h3 className="panel-title">Facet</h3>
      </div>
      <div className="panel-body">
        <SingleConstraintList values={defaultValues} addConstraint={() => {}} />
      </div>
    </div>
  </div>
));
