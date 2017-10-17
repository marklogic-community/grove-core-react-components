import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import MLSearchBar from './MLSearchBar';
import MLSearchResponseView from './MLSearchResponseView';

class MLSearchView extends Component {
  constructor(props) {
    super(props);

    this.handleQtextChange = this.handleQtextChange.bind(this);
    this.handleQtextClear = this.handleQtextClear.bind(this);
    this.handlePageSelection = this.handlePageSelection.bind(this);
    this.search = this.search.bind(this);
    this.loadDetail = this.loadDetail.bind(this);
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
    this.props.runSearch(this.props.stagedSearch);
  }

  loadDetail(uri) {
    console.log('clicked a link to load detail for uri ' + uri);
    this.props.loadDetail(uri);
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
              <MLSearchResponseView
                error={this.props.error}
                results={this.props.results}
                executionTime={this.props.executionTime}
                total={this.props.total}
                page={this.props.page}
                totalPages={this.props.totalPages}
                handlePageSelection={this.handlePageSelection}
                onLoadDetail={this.loadDetail}
              />
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

MLSearchView.propTypes = {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: PropTypes.object, // TODO: say more about shape of this
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  isSearchComplete: PropTypes.bool,
  qtext: PropTypes.string.isRequired,
  handleQtextChange: PropTypes.func,
  runSearch: PropTypes.func,
  changePage: PropTypes.func
};

export default MLSearchView;
