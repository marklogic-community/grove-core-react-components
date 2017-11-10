import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';
import './MLSearchResult.css';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const MLSearchResult = ({result}) => (
  <Col xs={12} sm={6} md={4} lg={3}
    className="ml-search-result"
  >
    <Panel>
      <h4>{result.label || prettyUri(result.uri)}</h4>
      <div className="ml-search-result-matches">
        {
          result.matches && result.matches.map((match, index) =>
            <MLSearchSnippet match={match} key={index} />
          )
        }
      </div>
    </Panel>
  </Col>
);

export default MLSearchResult;
