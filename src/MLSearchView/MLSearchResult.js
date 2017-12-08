import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MLSearchSnippet from './MLSearchSnippet.js';
import './MLSearchResult.css';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const MLSearchResult = (props) => (
  <Col xs={12} sm={6} md={4} lg={3}
    className="ml-search-result"
  >
    <Panel>
      <h4>
        <Link to={props.detailPath + encodeURIComponent(props.result.uri)}>
          {props.result.label || prettyUri(props.result.uri)}
        </Link>
      </h4>
      <div className="ml-search-result-matches">
        {
          props.result.matches && props.result.matches.map((match, index) =>
            <MLSearchSnippet match={match} key={index} />
          )
        }
      </div>
    </Panel>
  </Col>
);

export default MLSearchResult;
