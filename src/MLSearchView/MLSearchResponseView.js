import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

const MLSearchResponseView = (props) => (
  // TODO: better error rendering
  <div>
    {props.error &&
      <div>
        <p>
          There was an error performing your search. The server sent the following error message:
        </p>
        <p className="text-danger">{props.error}</p>
      </div>
    }
    {!props.error &&
      <div>
        <Row>
          <Col md={12}>
            <MLSearchMetrics
              time={props.executionTime}
              total={props.total}
            />
          </Col>
        </Row>
        <Row>
          <MLSearchResults
            className="ml-search-results"
            results={props.results || []}
            detailPath={props.detailPath}
            resultComponent={props.resultComponent}
          />
        </Row>
        <Row>
          <Col md={12}>
            <Pagination
              items={props.totalPages}
              maxButtons={10}
              boundaryLinks={true}
              activePage={props.page}
              onSelect={props.handlePageSelection} />
          </Col>
        </Row>
      </div>
    }
  </div>
);

MLSearchResponseView.propTypes = {
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageSelection: PropTypes.func,
};

export default MLSearchResponseView;
