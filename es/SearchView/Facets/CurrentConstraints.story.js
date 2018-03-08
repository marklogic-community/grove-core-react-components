/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CurrentConstraints from './CurrentConstraints';

storiesOf('SearchView/Facets/CurrentConstraints', module).add('default', function () {
  return (
    // TODO: allow state change
    React.createElement(CurrentConstraints, {
      constraints: { Example: { and: [{ name: 'selection1' }] } },
      removeConstraint: action('removeConstraint')
    })
  );
});