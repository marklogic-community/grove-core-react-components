# MarkLogic-UI-Resource (Muir) React Components

This library provides a set of React components useful for building applications backed by a MarkLogic database.

## Getting Started

### Installation

    npm install --save ml-treehouse-react

or

    yarn add ml-treehouse-react

### Implementation

You will need to create a React container in your host application to pass the necessary props and callback functions to the ML-Treehouse components that you are importing. See the [`MLSearchContainer`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/containers/MLSearchContainer.js) in the reference application for an example of doing this, using Redux modules. Also, look at [`App.js`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/App.js) and [`index.js`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/App.js) to see how selectors and actions are passed to `MLSearchContainer`.

## Components

### <DetailView />

This component provides a default view of a single document, together with some error handling. It can be customized:

#### Providing a custom detail page

<DetailView /> accepts a `template` attribute that will override the default template when a document is successfully retrieved. It gets passed all the props that <DetailView /> itself received. Typically, you will write a React component to render those props as desired. It can then be passed to <DetailView /> like so:

    <DetailView template={myCustomDetailComponent} />

In many cases, in applications using Redux, <DetailView /> is the top-level 'dumb' component being wrapped by a 'smart' Redux container. In that case, you can add your template to `mapStateToProps` directly, as in this example:

```javascript
//...
import { DetailView } from 'muir-react';
import myDetailComponent from '../components/myDetailComponent';

import { actions, selectors } from 'ml-documents-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  return {
    template: myDetailComponent,
    detail: sel.documentByUri(state, ownProps.uri),
    error: sel.errorByUri(state, ownProps.uri),
    contentType: sel.contentTypeByUri(state, ownProps.uri)
  };
};

//...
```

Or, you could allow the code consuming your container to pass in the template, and simply grab it from the `ownProps` argument from `mapStateToProps`.

### Storybook

We are creating a storybook for all the components present in this library. To see it, for the moment, clone this repository and run:

    npm run storybook

## Contributing

### Local Development of `ml-treehouse-react`

We need just one version of React, so, assuming your host application is at `../ml-treehouse-react-reference`, run the following. (If your host application is in a different directory, you will need to make appropriate changes.)

    npm link ../ml-treehouse-react
    cd ../ml-treehouse-react
    npm link ../ml-treehouse-react-reference/client/node_modules/react

### Tests

    npm run test

To run the tests continuously as you change files:

    npm run test:watch

To get a report on test coverage:

    npm run test:coverage
    open coverage/html/index.html

### Stories

Best practice is to add a story for each component that gets exported from this library. We are using [Storybook](https://github.com/storybooks/storybook) for this, which is a form of live documentation. At least, there should be a story example for each supported state of the component. It is also possible to make interactive examples, though this is more work. See <Facets /> for an example.

Eventually, we may tie stories together with testing. This could follow the model [described in this article](https://medium.com/@mlthuret/building-a-react-components-living-documentation-using-react-storybook-5f11f0e7d23e).

To create a story for a component, save it as a new file ending with '.story.js'. See the codebase for examples.

### Code-Style and Linting

TODO: Describe ESLint, benefits of linting javascript, and the benefits of a common code-style. Also, how to set up editor-support.

TODO: We should enforce linting as part of the build.

## Optional Badges

TODO: Evaluate which to keep.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
