import React from 'react';
import MLSearchResult from './MLSearchResult';
import './MLSearchResults.css';

const MLSearchResults = ({results}) => (
  <div className="ml-search-results">
    {
      results.map(result =>
        <MLSearchResult result={result} key={result.uri} />
      )
    }
  </div>
);

export default MLSearchResults;
