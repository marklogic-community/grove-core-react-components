import { configure } from '@storybook/react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const req = require.context('../src', true, /.*\.story\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
  // require('../stories/index.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
