/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import CurrentFilters from './CurrentFilters';

storiesOf('SearchView/Facets/CurrentFilters', module).add('default', () => (
  // TODO: allow state change
  <CurrentFilters
    filters={{ Example: { and: [{ name: 'selection1' }] } }}
    removeFilter={action('removeFilter')}
  />
));
