import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

class MLSearch extends Component {
  constructor(props) {
    super(props);

    this.handleQtextChange = this.handleQtextChange.bind(this);
    this.handleQtextClear = this.handleQtextClear.bind(this);
    this.search = this.search.bind(this);
  }

  handleQtextChange(event) {
    this.props.handleQtextChange(event.target.value);
  }

  handleQtextClear() {
    this.props.handleQtextChange('');
  }

  search(event) {
    event.preventDefault();
    this.props.runSearch(this.props.qtext);
  }

  render() {
    const executedSearch = this.props.executedSearch;

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
            {executedSearch && !executedSearch.pending &&
              <div>
                <Row>
                  <Col md={12}>
                    <MLSearchMetrics
                      time={executedSearch.executionTime}
                      total={executedSearch.total}
                    />
                  </Col>
                </Row>
                <Row>
                  <MLSearchResults
                    className="ml-search-results"
                    results={executedSearch.results || []}/>
                </Row>
              </div>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MLSearch;
