import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

const prettyUri = uri => {
  const uriParts = uri.split('/');
  return uriParts[uriParts.length - 1];
};

const ListResult = (props) => (
  <Col xs={12}
    className="ml-search-result"
  >
    <h4>
      <Link to={props.detailPath + encodeURIComponent(props.result.uri)}>
        {props.result.label || prettyUri(props.result.uri)}
      </Link>
    </h4>
    <div className="ml-search-result-matches">
      {
        props.result.matches && props.result.matches.map((match, index) =>
          <SearchSnippet match={match} key={index} />
        )
      }
    </div>
    <hr />
  </Col>
);

export default ListResult;
