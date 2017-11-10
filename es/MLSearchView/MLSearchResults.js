import React from 'react';
import MLSearchResult from './MLSearchResult';

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results,
      ResultComponent = _ref.resultComponent;
  return React.createElement(
    'div',
    { className: 'ml-search-results' },
    results && results.map(function (result) {
      return React.createElement(ResultComponent, { result: result, key: result.uri });
    })
  );
};

MLSearchResults.defaultProps = { resultComponent: MLSearchResult };

export default MLSearchResults;