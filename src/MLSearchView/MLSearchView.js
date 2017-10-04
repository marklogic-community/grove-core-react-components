import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Pagination } from 'react-bootstrap';

import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

class MLSearchView extends Component {
  constructor(props) {
    super(props);

    this.handleQtextChange = this.handleQtextChange.bind(this);
    this.handleQtextClear = this.handleQtextClear.bind(this);
    this.handlePageSelection = this.handlePageSelection.bind(this);
    this.search = this.search.bind(this);
  }

  handleQtextChange(event) {
    this.props.handleQtextChange(event.target.value);
  }

  handleQtextClear() {
    this.props.handleQtextChange('');
  }

  handlePageSelection(pageNumber) {
    if (pageNumber !== this.props.page) {
      this.props.changePage(pageNumber);
      this.search();
    }
  }

  search(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.runSearch(this.props.preExecutedSearch);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={3}/>
          <Col md={9}>
            <Row>
              <MLSearchBar
                qtext={this.props.qtext}
                onQtextChange={this.handleQtextChange}
                onQtextClear={this.handleQtextClear}
                onSearchExecute={this.search}
              />
            </Row>
            {this.props.isSearchComplete &&
              <div>
                <Row>
                  <Col md={12}>
                    <MLSearchMetrics
                      time={this.props.executionTime}
                      total={this.props.total}
                    />
                  </Col>
                </Row>
                <Row>
                  <MLSearchResults
                    className="ml-search-results"
                    results={this.props.results || []}/>
                </Row>
                <Row>
                  <Col md={12}>
                    <Pagination
                      items={this.props.totalPages}
                      maxButtons={10}
                      boundaryLinks={true}
                      activePage={this.props.page}
                      onSelect={this.handlePageSelection} />
                  </Col>
                </Row>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

MLSearchView.propTypes = {
  // TODO: flesh out
  // preExecutedSearch
  // results
  // executionTime
  // total
  // page
  // totalPages
  // isSearchComplete: PropTypes.bool,
  qtext: PropTypes.string.isRequired,
  handleQtextChange: PropTypes.func,
  runSearch: PropTypes.func,
  changePage: PropTypes.func
};

export default MLSearchView;
