import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';

const MLSearchResult = ({result}) => (
  <Col xs={12} sm={6} md={4} lg={3}
    className="ml-search-result"
    key={result.uri}
  >
    <Panel>
      <h4>{result.label || result.uri}</h4>
      <div className="ml-search-result-matches">
        {result.matches.map((match, index) =>
          <MLSearchSnippet match={match} key={index} />
        )}
      </div>
    </Panel>
  </Col>
);

export default MLSearchResult;
