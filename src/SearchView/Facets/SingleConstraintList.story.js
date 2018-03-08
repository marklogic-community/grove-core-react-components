/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SingleConstraintList from './SingleConstraintList';
import { defaultValues } from './shared';

storiesOf('SearchView/Facets/SingleConstraintList', module)
  .add('default', () => (
    <SingleConstraintList
      values={defaultValues}
      addConstraint={action('addConstraint')}
    />
  ))
  .add('with a selection', () => (
    <SingleConstraintList
      values={defaultValues}
      selectedValues={[{ value: 'First' }]}
      addConstraint={action('addConstraint')}
      removeConstraint={action('removeConstraint')}
    />
  ));
