import React from 'react';
import MLSearchResult from './MLSearchResult';
import './MLSearchResults.css';

const MLSearchResults = (props) => (
  <div className="ml-search-results">
    {
      props.results.map(result =>
        <MLSearchResult result={result} key={result.uri} detailPath={props.detailPath} />
      )
    }
  </div>
);

export default MLSearchResults;
