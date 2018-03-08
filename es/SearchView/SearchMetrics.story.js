/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchMetrics from './SearchMetrics';

storiesOf('SearchView/SearchResponseView/SearchMetrics', module).add('default', function () {
  return React.createElement(SearchMetrics, { time: 0.090908989, total: 1000 });
}).add('without time', function () {
  return React.createElement(SearchMetrics, { total: 1000 });
}).add('without total', function () {
  return React.createElement(SearchMetrics, { time: 0.090908989 });
}).add('with nothing', function () {
  return React.createElement(SearchMetrics, null);
});