'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _SearchSnippet = require('./SearchSnippet');

var _SearchSnippet2 = _interopRequireDefault(_SearchSnippet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('SearchView/SearchResponseView/SearchResults/SearchSnippet', module).add('with highlights', function () {
  return _react2.default.createElement(_SearchSnippet2.default, {
    match: {
      'match-text': ['I know how to display ', { highlight: 'highlighted' }, ' text. Like ', { highlight: 'this' }, ' and ', { highlight: 'that.' }]
    }
  });
}).add('no highlights', function () {
  return _react2.default.createElement(_SearchSnippet2.default, {
    match: {
      'match-text': ['I can also handle text with no highlights, of course.']
    }
  });
}); /* global module */