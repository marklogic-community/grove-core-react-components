import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

const prettyUri = uri => {
  if (!uri) {
    return null;
  }
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const ListResult = props => (
  <Col xs={12} className="ml-search-result">
    <h4>
      <Link to={props.detailPath + encodeURIComponent(props.result.id)}>
        {props.result.label || prettyUri(props.result.uri) || props.result.id}
      </Link>
    </h4>
    <div className="ml-search-result-matches">
      {props.result.matches &&
        props.result.matches.map((match, index) => (
          <SearchSnippet match={match} key={index} />
        ))}
    </div>
    <hr />
  </Col>
);

export default ListResult;
