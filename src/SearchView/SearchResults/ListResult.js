import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

const getFilename = uri => {
  if (!uri) {
    return null;
  }
  return uri.split('/').pop();
};

const ListResult = props => (
  <Col xs={12} className="ml-search-result">
    <h4>
      <Link to={props.detailPath + encodeURIComponent(props.result.id)}>
        {props.result.label || getFilename(props.result.uri) || props.result.id}
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
