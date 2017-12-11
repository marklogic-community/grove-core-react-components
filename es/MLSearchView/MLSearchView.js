function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import MLSearchBar from './MLSearchBar';
import MLSearchResponseView from './MLSearchResponseView';

var MLSearchView = function (_Component) {
  _inherits(MLSearchView, _Component);

  function MLSearchView(props) {
    _classCallCheck(this, MLSearchView);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleQtextChange = _this.handleQtextChange.bind(_this);
    _this.handleQtextClear = _this.handleQtextClear.bind(_this);
    _this.handlePageSelection = _this.handlePageSelection.bind(_this);
    _this.search = _this.search.bind(_this);
    return _this;
  }

  MLSearchView.prototype.handleQtextChange = function handleQtextChange(event) {
    this.props.handleQtextChange(event.target.value);
  };

  MLSearchView.prototype.handleQtextClear = function handleQtextClear() {
    this.props.handleQtextChange('');
  };

  MLSearchView.prototype.handlePageSelection = function handlePageSelection(pageNumber) {
    if (pageNumber !== this.props.page) {
      this.props.changePage(pageNumber);
      this.search();
    }
  };

  MLSearchView.prototype.search = function search(event) {
    if (event) {
      event.preventDefault();
    }
    this.props.runSearch(this.props.stagedSearch);
  };

  MLSearchView.prototype.render = function render() {
    return React.createElement(
      Grid,
      null,
      React.createElement(
        Row,
        null,
        React.createElement(Col, { md: 3 }),
        React.createElement(
          Col,
          { md: 9 },
          React.createElement(
            Row,
            null,
            React.createElement(MLSearchBar, {
              qtext: this.props.qtext,
              onQtextChange: this.handleQtextChange,
              onQtextClear: this.handleQtextClear,
              onSearchExecute: this.search
            })
          ),
          this.props.isSearchComplete && React.createElement(MLSearchResponseView, {
            error: this.props.error,
            results: this.props.results,
            executionTime: this.props.executionTime,
            total: this.props.total,
            page: this.props.page,
            totalPages: this.props.totalPages,
            handlePageSelection: this.handlePageSelection,
            detailPath: this.props.detailPath
          })
        )
      )
    );
  };

  return MLSearchView;
}(Component);

MLSearchView.propTypes = process.env.NODE_ENV !== "production" ? {
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
  changePage: PropTypes.func,
  detailPath: PropTypes.string
} : {};

export default MLSearchView;