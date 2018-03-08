/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import filter from 'lodash/filter';
import omit from 'lodash/omit';

import Facets from './Facets';

import { defaultValues } from './shared';

export const defaultNonSelectedFacets = {
  Example: { facetValues: defaultValues },
  AnotherExample: { facetValues: defaultValues }
};

class InteractiveFacets extends React.Component {
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
                ...this.state.activeConstraints,
                [facetName]: { and: [{ name: value, value: value }] }
              },
              availableConstraints: {
                ...this.state.availableConstraints,
                [facetName]: {
                  facetValues: filter(defaultValues, {
                    name: value,
                    value: value
                  })
                }
              }
            });
          }}
          removeConstraint={facetName => {
            this.setState({
              activeConstraints: omit(this.state.activeConstraints, facetName),
              availableConstraints: {
                ...this.state.availableConstraints,
                [facetName]: {
                  facetValues: defaultValues
                }
              }
            });
          }}
        />
      </div>
    );
  }
}

storiesOf('SearchView/Facets', module)
  .add('default', () => (
    <div className="col-md-3">
      <Facets
        activeConstraints={{}}
        availableConstraints={defaultNonSelectedFacets}
        addConstraint={action('addConstraint')}
        removeConstraint={action('removeConstraint')}
      />
    </div>
  ))
  .add('with a selection', () => (
    <div className="col-md-3">
      <Facets
        activeConstraints={{
          Example: { and: [{ name: 'First', value: 'First' }] }
        }}
        availableConstraints={defaultNonSelectedFacets}
        addConstraint={action('addConstraint')}
        removeConstraint={action('removeConstraint')}
      />
    </div>
  ))
  .add('interactive', () => <InteractiveFacets />);
