'use strict';

exports.__esModule = true;
var mockResults = exports.mockResults = [{
  label: 'A Search Result',
  metadata: {},
  matches: [{
    'match-text': ['We found the word ', { highlight: 'clandestine ' }, 'for you.']
  }],
  uri: '/uri/1.json'
}, {
  label: 'Another Search Result',
  matches: [{
    'match-text': [{ highlight: 'Waldo' }, ' is over here.']
  }, {
    'match-text': ['He (', { highlight: 'Waldo' }, ') is over here too.']
  }],
  uri: '/uri/2.json'
}, {
  label: 'A Search Result With a Particularly Long Label, Right?',
  matches: [{
    'match-text': ['This one also has a lot of matches ...']
  }, {
    'match-text': ['... for some reason that I cannot really explain ...']
  }, {
    'match-text': ['... but I guess someone has to do the testing dirty work.']
  }, {
    'match-text': ['Lorem ipsum dolor sit amet, consectetur adipiscing elit,' + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.']
  }],
  uri: '/uri/3.json'
}, {
  matches: [{
    'match-text': ['But I did provide a ', { highlight: 'match' }, '!']
  }],
  uri: '/uri/no-label-provided.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/5.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/6.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/7.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/8.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/9.json'
}, {
  label: 'A Search Result',
  matches: [],
  uri: '/uri/10.json'
}];