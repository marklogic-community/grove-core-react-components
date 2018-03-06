/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import CurrentConstraints from './CurrentConstraints';

storiesOf('Facets/CurrentConstraints', module).add('default', () => (
  // TODO: allow state change
  <CurrentConstraints
    constraints={{ Example: [{ value: 'selection1', name: 'selection1' }] }}
    removeConstraint={() => {}}
  />
));
