/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Login from './Login';

storiesOf('Login', module).add('default', function () {
  return React.createElement(Login, { submitLogin: action('submitLogin') });
});