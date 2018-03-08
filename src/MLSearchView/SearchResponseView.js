import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import SearchResults from './SearchResults/SearchResults';
import SearchMetrics from './SearchMetrics';

// TODO: better error rendering
const SearchResponseView = props => {
  return (
    <Row>
      <Col md={12}>
        {props.error ? (
          <div>
            <p>
              There was an error performing your search. The server sent the
              following error message:
            </p>
            <p className="text-danger">{props.error}</p>
          </div>
        ) : (
          <div>
            <Col md={6}>
              <SearchMetrics time={props.executionTime} total={props.total} />
            </Col>
            <SearchResults
              results={props.results || []}
              detailPath={props.detailPath}
              resultComponent={props.resultComponent}
            />
            {props.totalPages > 1 && (
              <Row>
                <Col md={12}>
                  <Pagination
                    items={props.totalPages}
                    maxButtons={10}
                    boundaryLinks={true}
                    activePage={props.page}
                    onSelect={props.handlePageSelection}
                  />
                </Col>
              </Row>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

SearchResponseView.propTypes = {
  error: PropTypes.string,
  results: PropTypes.array,
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageSelection: PropTypes.func
};

export default SearchResponseView;
