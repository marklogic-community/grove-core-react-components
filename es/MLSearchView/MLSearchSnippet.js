import React from 'react';

var MLSearchSnippet = function MLSearchSnippet(props) {
  var match = props.match;
  var matchSpans = match['match-text'].map(function (text, index) {
    return React.createElement(
      'em',
      { className: text.highlight ? 'mark' : '', key: index },
      text.highlight || text
    );
  });

  return React.createElement(
    'div',
    { className: 'ml-search-result-match' },
    matchSpans
  );
};

export default MLSearchSnippet;