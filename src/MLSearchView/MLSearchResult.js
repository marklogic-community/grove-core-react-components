import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';
import MLDetailView from './../MLDetailView/MLDetailView';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const MLSearchResult = (props) => (
  <Col xs={12} sm={6} md={4} lg={3}
    className="ml-search-result"
    key={props.result.uri}
  >
    <Panel>
      <h4>
        <a href="#" onClick={() => props.onLoadDetail(props.result.uri)}>
          {props.result.label || prettyUri(props.result.uri)}</a>
      </h4>
      <div className="ml-search-result-matches">
        {props.result.matches.map((match, index) =>
          <MLSearchSnippet match={match} key={index} />
        )}
      </div>
    </Panel>
  </Col>
);

export default MLSearchResult;
