/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import SimilarPanel from './SimilarPanel';

const similar = [];

storiesOf('SimilarPanel', module).add('default', () => (
  <SimilarPanel ids={similar} />
));
