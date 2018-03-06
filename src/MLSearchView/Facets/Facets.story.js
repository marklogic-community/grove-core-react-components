/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import filter from 'lodash/filter';

import Facets from './Facets';

import { defaultValues } from './shared';

const defaultNonSelectedFacets = { Example: { facetValues: defaultValues } };

class FacetsWithState extends React.Component {
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
        <Facets
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

storiesOf('Facets', module).add('default', () => <FacetsWithState />);
