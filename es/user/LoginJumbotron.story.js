/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import LoginJumbotron from './LoginJumbotron';

storiesOf('Login/LoginJumbotron', module).add('default', function () {
  return React.createElement(LoginJumbotron, { submitLogin: action('submitLogin') });
});