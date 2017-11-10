# MarkLogic Treehouse React Components (ml-treehouse-react)

This library provides a set of React components useful for building applications backed by a MarkLogic database.

## Getting Started

### Installation

    npm install --save ml-treehouse-react

or

    yarn add ml-treehouse-react

### Implementation

You will need to create a React container in your host application to pass the necessary props and callback functions to the ML-Treehouse components that you are importing. See the [`MLSearchContainer`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/containers/MLSearchContainer.js) in the reference application for an example of doing this, using Redux modules. Also, look at [`App.js`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/App.js) and [`index.js`](https://project.marklogic.com/repo/projects/NACW/repos/ml-treehouse/browse/client/src/App.js) to see how selectors and actions are passed to `MLSearchContainer`.

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
