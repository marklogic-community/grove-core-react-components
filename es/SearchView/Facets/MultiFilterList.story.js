/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MultiFilterList from './MultiFilterList';
import { defaultValues } from './shared';

storiesOf('SearchView/Facets/MultiFilterList', module).add('default', function () {
  return React.createElement(MultiFilterList, {
    values: defaultValues,
    addFilter: action('addFilter')
  });
}).add('with a selection', function () {
  return React.createElement(MultiFilterList, {
    values: defaultValues,
    selectedValues: [{ value: 'First' }],
    addFilter: action('addFilter'),
    removeFilter: action('removeFilter')
  });
});