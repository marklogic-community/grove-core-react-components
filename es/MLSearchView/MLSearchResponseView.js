import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

var MLSearchResponseView = function MLSearchResponseView(props) {
  return (
    // TODO: better error rendering
    React.createElement(
      'div',
      null,
      props.error && React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          'There was an error performing your search. The server sent the following error message:'
        ),
        React.createElement(
          'p',
          { className: 'text-danger' },
          props.error
        )
      ),
      !props.error && React.createElement(
        'div',
        null,
        React.createElement(
          Row,
          null,
          React.createElement(
            Col,
            { md: 12 },
            React.createElement(MLSearchMetrics, {
              time: props.executionTime,
              total: props.total
            })
          )
        ),
        React.createElement(
          Row,
          null,
          React.createElement(MLSearchResults, {
            className: 'ml-search-results',
            results: props.results || [],
            detailPath: props.detailPath
          })
        ),
        React.createElement(
          Row,
          null,
          React.createElement(
            Col,
            { md: 12 },
            React.createElement(Pagination, {
              items: props.totalPages,
              maxButtons: 10,
              boundaryLinks: true,
              activePage: props.page,
              onSelect: props.handlePageSelection })
          )
        )
      )
    )
  );
};

MLSearchResponseView.propTypes = process.env.NODE_ENV !== "production" ? {
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageSelection: PropTypes.func
} : {};

export default MLSearchResponseView;