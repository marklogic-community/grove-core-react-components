import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import SearchResults from './SearchResults/SearchResults';
import SearchMetrics from './SearchMetrics';

var SearchResponseView = function SearchResponseView(props) {
  return React.createElement(
    Row,
    null,
    React.createElement(
      Col,
      { md: 12 },
      React.createElement(
        Row,
        null,
        props.error ? React.createElement(
          Col,
          { md: 12 },
          React.createElement(
            'p',
            null,
            React.createElement(
              'strong',
              null,
              'There was an error performing your search.'
            )
          ),
          React.createElement(
            'p',
            null,
            'The server sent the following error message:\xA0',
            React.createElement(
              'span',
              { className: 'text-danger' },
              props.error
            )
          )
        ) : !props.isSearchPending && React.createElement(
          'div',
          null,
          React.createElement(
            Col,
            { md: 6 },
            React.createElement(SearchMetrics, {
              time: props.executionTime,
              total: props.total
            })
          ),
          React.createElement(SearchResults, {
            results: props.results || [],
            detailPath: props.detailPath,
            resultComponent: props.resultComponent
          }),
          props.totalPages > 1 && React.createElement(
            Col,
            { md: 12 },
            React.createElement(Pagination, {
              items: props.totalPages,
              maxButtons: 10,
              boundaryLinks: true,
              activePage: props.page,
              onSelect: props.handlePageSelection
            })
          )
        )
      )
    )
  );
};

SearchResponseView.propTypes = process.env.NODE_ENV !== "production" ? {
  error: PropTypes.string,
  results: PropTypes.array,
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageSelection: PropTypes.func
} : {};

export default SearchResponseView;