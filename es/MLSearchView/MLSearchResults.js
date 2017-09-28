import React from 'react';
import MLSearchResult from './MLSearchResult';
import './MLSearchResults.css';

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results;
  return React.createElement(
    'div',
    { className: 'ml-search-results' },
    results.map(function (result) {
      return React.createElement(MLSearchResult, { result: result, key: result.uri });
    })
  );
};

export default MLSearchResults;