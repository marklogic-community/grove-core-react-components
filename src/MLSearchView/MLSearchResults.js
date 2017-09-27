import React from 'react';
import { Col } from 'react-bootstrap';
import MLSearchResult from './MLSearchResult';
import './MLSearchResults.css';

const renderResults = results => {
  return results.map(result =>
    <MLSearchResult result={result} key={result.uri} />
  );
};

const renderNothing = () => <Col md={12}><p>No results to show.</p></Col>;

const MLSearchResults = ({results}) => (
  <div className="ml-search-results">
    { (results.length > 0) ? renderResults(results) : renderNothing() }
  </div>
);

export default MLSearchResults;
