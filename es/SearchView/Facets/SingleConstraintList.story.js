/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SingleConstraintList from './SingleConstraintList';
import { defaultValues } from './shared';

storiesOf('SearchView/Facets/SingleConstraintList', module).add('default', function () {
  return React.createElement(SingleConstraintList, {
    values: defaultValues,
    addConstraint: action('addConstraint')
  });
}).add('with a selection', function () {
  return React.createElement(SingleConstraintList, {
    values: defaultValues,
    selectedValues: [{ value: 'First' }],
    addConstraint: action('addConstraint'),
    removeConstraint: action('removeConstraint')
  });
});