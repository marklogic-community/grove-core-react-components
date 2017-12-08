import React from 'react';
import MLSearchResult from './MLSearchResult';

const MLSearchResults = ({results, detailPath, resultComponent: ResultComponent}) => (
  <div className="ml-search-results">
    {
      results && results.map(result =>
        <ResultComponent result={result}
          key={result.uri}
          detailPath={detailPath}
        />
      )
    }
  </div>
);

MLSearchResults.defaultProps = { resultComponent: MLSearchResult };

export default MLSearchResults;
