/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import SearchResponseView from './SearchResponseView';

import { mockResults } from './test/mockData.js';

storiesOf('SearchView/SearchResponseView', module).add('with results', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      'div',
      { className: 'col-md-12' },
      React.createElement(SearchResponseView, {
        results: mockResults,
        executionTime: 10.3456,
        total: 99,
        page: 1,
        totalPages: 10,
        handlePageSelection: action('handlePageSelection')
      })
    )
  );
}).add('with no results', function () {
  return React.createElement(
    'div',
    { className: 'col-md-12' },
    React.createElement(SearchResponseView, { results: [], total: 0, executionTime: 9.98080 })
  );
}).add('with an error', function () {
  return React.createElement(
    'div',
    { className: 'col-md-12' },
    React.createElement(SearchResponseView, { error: 'ERROR: This is an error.' })
  );
});

// TODO: with results, error