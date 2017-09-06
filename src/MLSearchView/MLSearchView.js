import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';

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
            <Row>
              <MLSearchResults
                className="ml-search-results"
                results={this.props.results || []}/>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MLSearch;
