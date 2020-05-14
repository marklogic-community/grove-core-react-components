import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippets from './SearchSnippets.js';

const getFilename = id => {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

const Header = props => (
  <h4>
    <Link
      to={{
        pathname: props.detailPath,
        state: { id: props.result.id },
        search: `?id=${props.result.id}`
      }}
    >
      {props.result.label || getFilename(props.result.id) || props.result.uri}
    </Link>
  </h4>
);

const ListResult = props => (
  <Col xs={12} className="ml-search-result">
    <props.header {...props} />
    <props.content {...props} />
    <SearchSnippets {...props} />
    <hr />
  </Col>
);

ListResult.defaultProps = {
  content: SearchSnippets,
  header: Header,
  detailPath: '/detail'
};

ListResult.propTypes = {
  content: PropTypes.func,
  header: PropTypes.func,
  detailPath: PropTypes.string,
  result: PropTypes.shape({
    id: PropTypes.string
  })
};

export default ListResult;
