/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import SearchResults from './SearchResults';

import { mockResults } from '../test/mockData.js';

storiesOf('SearchView/SearchResponseView/SearchResults', module).add('with results', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(SearchResults, { results: mockResults })
    )
  );
}).add('with no results', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(SearchResults, { results: [] })
    )
  );
});