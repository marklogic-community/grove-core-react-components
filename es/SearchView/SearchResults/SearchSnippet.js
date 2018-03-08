import React from 'react';

var SearchSnippet = function SearchSnippet(_ref) {
  var match = _ref.match;

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

export default SearchSnippet;