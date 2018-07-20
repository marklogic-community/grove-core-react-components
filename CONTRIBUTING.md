## Prerequisites

[Node.js](http://nodejs.org/) >= v4 must be installed.

## Installation

- Running `npm install` in the components's root directory will install everything you need for development.

## Demo Development Server

- `npm start` will run a development server with the component's demo app at [http://localhost:3000](http://localhost:3000) with hot module reloading.

## Running Tests

- `npm test` will run the tests once.

- `npm run test:coverage` will run the tests and produce a coverage report in `coverage/`.

- `npm run test:watch` will run the tests on every change.

## Building

- `npm run build` will build the component for publishing to npm and also bundle the demo app.

- `npm run clean` will delete built resources.

## Please Write Some Tests

Write unit tests for the React components we build. We should aim toward modeling and documenting what we think are the best practices, and refine as we move forward.

For example:

1. Always write a smoke test to ensure the component can render without exploding. See the testing discussion for create-react-app. This is an easy, but valuable, test to write and breaks the testing ice for each component.

1a. Normally, smoke test the component in isolation using Enzyme's Shallow Rendering. This makes failures easy to locate and speeds up test runs.

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import MLSearchBar from '../MLSearchBar';

it('renders without crashing', () => {
  shallow(<MLSearchBar />);
});
```

1b. If the component is a high-level container, also smoke test the component without isolation using Enzyme's Full Rendering API, so we have smoke tests for the integration between components as well.

```javascript
import React from 'react';
import { shallow, mount } from 'enzyme';
import MLSearch from '../MLSearch';

it('renders without crashing', () => {
  shallow(<MLSearch />);
});

it('renders, integrated with children, without crashing', () => {
  mount(<MLSearch />);
});
```

1c. If applicable, smoke test with and without optional props as well as with minimal and rich prop mocks.

```javascript
import React from 'react';
import { shallow } from 'enzyme';
import MLSearchSnippet from '../MLSearchSnippet';

it('renders an empty match without crashing', () => {
  const match = {
    'match-text': []
  };
  shallow(<MLSearchSnippet match={match} />);
});

it('renders a match without crashing', () => {
  const match = {
    'match-text': [
      'We found the word ',
      {highlight: 'clandestine '},
      'for you.'
    ]
  };
  shallow(<MLSearchSnippet match={match} />);
});
```

1d. If we find that React tooling is now or becomes good enough to effectively smoke test some components (for example, those without props or state), we may want to reconsider parts of this advice.
