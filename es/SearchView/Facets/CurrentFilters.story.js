/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CurrentFilters from './CurrentFilters';

storiesOf('SearchView/Facets/CurrentFilters', module).add('default', function () {
  return (
    // TODO: allow state change
    React.createElement(CurrentFilters, {
      filters: [{
        constraint: 'Example',
        value: ['selection1']
      }],
      removeFilter: action('removeFilter')
    })
  );
});