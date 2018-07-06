function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SearchBar from './SearchBar';
import Facets from './Facets/Facets';
import SearchResponseView from './SearchResponseView';
import Fade from '../animations/Fade';

var SearchView = function (_Component) {
  _inherits(SearchView, _Component);

  function SearchView(props) {
    _classCallCheck(this, SearchView);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleQueryTextChange = _this.handleQueryTextChange.bind(_this);
    _this.handlePageSelection = _this.handlePageSelection.bind(_this);
    _this.search = _this.search.bind(_this);
    return _this;
  }

  // TODO: probably should pull out the value within the SearchBar


  SearchView.prototype.handleQueryTextChange = function handleQueryTextChange(value) {
    this.props.handleQueryTextChange(value);
  };

  SearchView.prototype.handlePageSelection = function handlePageSelection(pageNumber) {
    if (pageNumber !== this.props.page) {
      this.props.changePage(pageNumber);
    }
  };

  SearchView.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.stagedSearch.page !== this.props.stagedSearch.page ||
    // Intentionally using != to test object reference (ie, is it the
    // same object?) Because our Redux flow will swap out the filters
    // object on any change, but keep it referentially the same otherwise
    prevProps.stagedSearch.filters != this.props.stagedSearch.filters) {
      // TODO: DRY up with this.search()?
      this.props.runSearch(this.props.stagedSearch);
    }
  };

  SearchView.prototype.search = function search() {
    this.props.runSearch(this.props.stagedSearch);
  };

  SearchView.prototype.render = function render() {
    return React.createElement(
      Row,
      null,
      React.createElement(
        Col,
        { md: 3 },
        React.createElement(Facets, {
          availableFilters: this.props.facets,
          activeFilters: this.props.activeFilters,
          addFilter: this.props.addFilter,
          removeFilter: this.props.removeFilter
        })
      ),
      React.createElement(
        Col,
        { md: 9 },
        React.createElement(
          Row,
          null,
          React.createElement(SearchBar, {
            queryText: this.props.queryText,
            onQueryTextChange: this.handleQueryTextChange,
            onSearchExecute: this.search
          })
        ),
        this.props.isSearchComplete || this.props.isSearchPending ? React.createElement(
          Fade,
          { 'in': this.props.isSearchComplete, appear: true },
          React.createElement(SearchResponseView, {
            error: this.props.error,
            results: this.props.results,
            executionTime: this.props.executionTime,
            total: this.props.total,
            page: this.props.page,
            totalPages: this.props.totalPages,
            handlePageSelection: this.handlePageSelection,
            detailPath: this.props.detailPath,
            resultComponent: this.props.resultComponent,
            isSearchPending: this.props.isSearchPending
          })
        ) : React.createElement(
          'p',
          null,
          'Please click Search to find results.'
        )
      )
    );
  };

  return SearchView;
}(Component);

SearchView.propTypes = process.env.NODE_ENV !== "production" ? {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: PropTypes.object.isRequired,
  queryText: PropTypes.string.isRequired,
  handleQueryTextChange: PropTypes.func.isRequired,
  runSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  isSearchComplete: PropTypes.bool,
  changePage: PropTypes.func,
  detailPath: PropTypes.string,

  // TODO: rename facets => availableFilters?
  facets: PropTypes.object,
  activeFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
} : {};

export default SearchView;