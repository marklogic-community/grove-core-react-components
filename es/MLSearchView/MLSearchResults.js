import React from 'react';
import MLSearchResult from './MLSearchResult';

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results,
      detailPath = _ref.detailPath,
      ResultComponent = _ref.resultComponent;
  return React.createElement(
    'div',
    { className: 'ml-search-results' },
    results && results.map(function (result) {
      return React.createElement(ResultComponent, { result: result,
        key: result.uri,
        detailPath: detailPath
      });
    })
  );
};

MLSearchResults.defaultProps = { resultComponent: MLSearchResult };

export default MLSearchResults;