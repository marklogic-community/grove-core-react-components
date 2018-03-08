/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import CardResult from './CardResult';

import { mockResults } from '../test/mockData.js';

storiesOf('SearchView/SearchResponseView/SearchResults/CardResult', module).add('with label', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(CardResult, { result: mockResults[0] })
  );
}).add('with long text', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(CardResult, { result: mockResults[2] })
  );
}).add('without label', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(CardResult, { result: mockResults[3] })
  );
});