/* global module, Promise */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import CreateView from './CreateView';

storiesOf('CreateView', module).add('default', function () {
  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(CreateView, {
      redirectPath: '/detail',
      onCreateExecute: function onCreateExecute() {
        return Promise.resolve(action('onCreateExecute').apply(undefined, arguments));
      }
    })
  );
});