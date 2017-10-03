function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Pagination } from 'react-bootstrap';

import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

var MLSearchView = function (_Component) {
  _inherits(MLSearchView, _Component);

  function MLSearchView(props) {
    _classCallCheck(this, MLSearchView);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleQtextChange = _this.handleQtextChange.bind(_this);
    _this.handleQtextClear = _this.handleQtextClear.bind(_this);
    _this.search = _this.search.bind(_this);
    return _this;
  }

  MLSearchView.prototype.handleQtextChange = function handleQtextChange(event) {
    this.props.handleQtextChange(event.target.value);
  };

  MLSearchView.prototype.handleQtextClear = function handleQtextClear() {
    this.props.handleQtextChange('');
  };

  MLSearchView.prototype.search = function search(event) {
    event.preventDefault();
    this.props.runSearch(this.props.preExecutedSearch);
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
          this.props.isSearchComplete && React.createElement(
            'div',
            null,
            React.createElement(
              Row,
              null,
              React.createElement(
                Col,
                { md: 12 },
                React.createElement(MLSearchMetrics, {
                  time: this.props.executionTime,
                  total: this.props.total
                })
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(MLSearchResults, {
                className: 'ml-search-results',
                results: this.props.results || [] })
            ),
            React.createElement(
              Row,
              null,
              React.createElement(
                Col,
                { md: 12 },
                React.createElement(Pagination, {
                  items: this.props.totalPages,
                  maxButtons: 10,
                  boundaryLinks: true,
                  activePage: this.props.page
                })
              )
            )
          )
        )
      )
    );
  };

  return MLSearchView;
}(Component);

MLSearchView.propTypes = process.env.NODE_ENV !== "production" ? {
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
  runSearch: PropTypes.func
} : {};

export default MLSearchView;