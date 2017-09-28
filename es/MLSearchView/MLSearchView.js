function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';
import MLSearchMetrics from './MLSearchMetrics';

var MLSearch = function (_Component) {
  _inherits(MLSearch, _Component);

  function MLSearch(props) {
    _classCallCheck(this, MLSearch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleQtextChange = _this.handleQtextChange.bind(_this);
    _this.handleQtextClear = _this.handleQtextClear.bind(_this);
    _this.search = _this.search.bind(_this);
    return _this;
  }

  MLSearch.prototype.handleQtextChange = function handleQtextChange(event) {
    this.props.handleQtextChange(event.target.value);
  };

  MLSearch.prototype.handleQtextClear = function handleQtextClear() {
    this.props.handleQtextChange('');
  };

  MLSearch.prototype.search = function search(event) {
    event.preventDefault();
    this.props.runSearch(this.props.qtext);
  };

  MLSearch.prototype.render = function render() {
    var executedSearch = this.props.executedSearch;

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
          executedSearch && !executedSearch.pending && React.createElement(
            'div',
            null,
            React.createElement(
              Row,
              null,
              React.createElement(
                Col,
                { md: 12 },
                React.createElement(MLSearchMetrics, {
                  time: executedSearch.executionTime,
                  total: executedSearch.total
                })
              )
            ),
            React.createElement(
              Row,
              null,
              React.createElement(MLSearchResults, {
                className: 'ml-search-results',
                results: executedSearch.results || [] })
            )
          )
        )
      )
    );
  };

  return MLSearch;
}(Component);

export default MLSearch;