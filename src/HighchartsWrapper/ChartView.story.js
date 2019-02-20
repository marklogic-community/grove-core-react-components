/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
import ChartView from './ChartView';

storiesOf('ChartView', module).add('default', () => <ChartView />);
