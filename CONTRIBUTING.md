# Thanks for Contributing!

This repository is for reusable Grove React components. Specifically, it is for core components. If you are adding a component, it is possible that we will recommend publishing those in a separate package, but [open an issue](https://project.marklogic.com/jira/projects/GROVE/summary) so we can discuss.

Please be sure you have reviewed the Grove [Contributors Guide](https://wiki.marklogic.com/display/SAL/Grove+Contributor+Starters+Guide) and Grove [React Contributors Guide](https://wiki.marklogic.com/display/SAL/React+Contributors+Guide).

## Prerequisites

[Node.js](http://nodejs.org/) >= v8 must be installed.
NWB version 0.21.5
- `npm install -g nwb@0.21.5`

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

## Please Write Some Tests (we can help)

It is fine if you want to open a PR without tests, if that is an obstacle. The maintainers can work with you to add them. See the [React Contributors Guide](https://wiki.marklogic.com/display/SAL/React+Contributors+Guide) for more information.
