import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Pagination,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton
} from 'react-bootstrap';

import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';
import CardsResult from './MLSearchResult';
import ListResult from './ListResult';

class MLSearchResponseView extends Component {
  constructor(props) {
    super(props);
    const resultComponentName = props.resultComponent ? '' : 'Cards';
    this.state = {
      resultComponentName: resultComponentName,
      resultComponent: props.resultComponent
    };
    this.setResultType = this.setResultType.bind(this);
  }

  setResultType(e) {
    let resultComponent;
    if (e === 'Cards') {
      resultComponent = CardsResult;
    } else if (e === 'List') {
      resultComponent = ListResult;
    } else {
      throw 'Invalid Result Type: ' + e;
    }
    this.setState({
      resultComponentName: e,
      resultComponent: resultComponent
    });
  }

  render() {
    // TODO: better error rendering
    return (
      <div>
        {this.props.error &&
          <div>
            <p>
              There was an error performing your search.
              The server sent the following error message:
            </p>
            <p className="text-danger">{this.props.error}</p>
          </div>
        }
        {!this.props.error &&
          <div>
            <Row>
              <Col md={12}>
                <MLSearchMetrics
                  time={this.props.executionTime}
                  total={this.props.total}
                />
                <ButtonToolbar style={{float: 'right'}}>
                  <ToggleButtonGroup
                    type="radio"
                    name="result-options"
                    value={this.state.resultComponentName}
                    onChange={this.setResultType}
                  >
                    <ToggleButton value="Cards">
                      Cards
                    </ToggleButton>
                    <ToggleButton value="List">
                      List
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
            <Row>
              <MLSearchResults
                className="ml-search-results"
                results={this.props.results || []}
                detailPath={this.props.detailPath}
                resultComponent={this.state.resultComponent}
              />
            </Row>
            <Row>
              <Col md={12}>
                <Pagination
                  items={this.props.totalPages}
                  maxButtons={10}
                  boundaryLinks={true}
                  activePage={this.props.page}
                  onSelect={this.props.handlePageSelection} />
              </Col>
            </Row>
          </div>
        }
      </div>
    );
  }
}

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
