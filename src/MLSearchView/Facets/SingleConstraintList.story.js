/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import SingleConstraintList from './SingleConstraintList';
import { defaultValues } from './shared';

storiesOf('Facets/SingleConstraintList', module).add('default', () => (
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
