import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';

class MLSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qtext: '',
      results: []
    };

    this.handleQtextChange = this.handleQtextChange.bind(this);
    this.handleQtextClear = this.handleQtextClear.bind(this);
    this.search = this.search.bind(this);
  }

  handleQtextChange(event) {
    this.setState({
      qtext: event.target.value
    });
  }

  handleQtextClear() {
    this.setState({
      qtext: ''
    });
  }

  search() {
    const searchResults = this.props.runSearch({
      qtext: this.state.qtext
    });
    this.setState({
      results: searchResults.results
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={3}/>
          <Col md={9}>
            <Row>
              <MLSearchBar
                qtext={this.state.qtext}
                onQtextChange={this.handleQtextChange}
                onQtextClear={this.handleQtextClear}
                onSearchExecute={this.search}
              />
            </Row>
            <Row>
              <MLSearchResults className="ml-search-results" results={this.state.results}/>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MLSearch;
