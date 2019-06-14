'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _SearchBar = require('./SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

var _Facets = require('./Facets/Facets');

var _Facets2 = _interopRequireDefault(_Facets);

var _SearchResponseView = require('./SearchResponseView');

var _SearchResponseView2 = _interopRequireDefault(_SearchResponseView);

var _Fade = require('../animations/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _OpenLayersSearchMap = require('../Map/OpenLayersSearchMap');

var _OpenLayersSearchMap2 = _interopRequireDefault(_OpenLayersSearchMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    if (
    // Intentionally using != to test object reference (ie, is it the
    // same object?) Because our Redux flow will swap out the filters
    // object on any change, but keep it referentially the same otherwise
    prevProps.stagedSearch.filters != this.props.stagedSearch.filters) {
      this.search();
    }
    if (prevProps.stagedSearch.page !== this.props.stagedSearch.page) {
      // TODO: DRY up with this.search()?
      this.props.runSearch(this.props.stagedSearch);
    }
  };

  SearchView.prototype.search = function search() {
    if (this.props.stagedSearch.page == 1) {
      this.props.runSearch(this.props.stagedSearch);
    } else {
      this.props.changePage(1);
    }
  };

  SearchView.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Row,
      null,
      _react2.default.createElement(
        _reactBootstrap.Col,
        { md: 3 },
        _react2.default.createElement(_Facets2.default, {
          availableFilters: this.props.facets,
          activeFilters: this.props.activeFilters,
          addFilter: this.props.addFilter,
          removeFilter: this.props.removeFilter
        })
      ),
      _react2.default.createElement(
        _reactBootstrap.Col,
        { md: 9 },
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(_SearchBar2.default, {
            queryText: this.props.queryText,
            onQueryTextChange: this.handleQueryTextChange,
            onSearchExecute: this.search
          })
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(_OpenLayersSearchMap2.default, {
            facets: this.props.facets,
            onSearch: this.search,
            geoFacetName: 'GeoPoint',
            activeFilters: this.props.activeFilters,
            replaceFilter: this.props.replaceFilter,
            addFilter: this.props.addFilter,
            removeFilter: this.props.removeFilter
          })
        ),
        this.props.isSearchComplete || this.props.isSearchPending ? _react2.default.createElement(
          _Fade2.default,
          { 'in': this.props.isSearchComplete, appear: true },
          _react2.default.createElement(_SearchResponseView2.default, {
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
        ) : _react2.default.createElement(
          'p',
          null,
          'Please click Search to find results.'
        )
      )
    );
  };

  return SearchView;
}(_react.Component);

SearchView.propTypes = process.env.NODE_ENV !== "production" ? {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: _propTypes2.default.object.isRequired,
  queryText: _propTypes2.default.string.isRequired,
  handleQueryTextChange: _propTypes2.default.func.isRequired,
  runSearch: _propTypes2.default.func.isRequired,
  error: _propTypes2.default.string,
  results: _propTypes2.default.array, // TODO: say more about shape of this
  executionTime: _propTypes2.default.number,
  total: _propTypes2.default.number,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  isSearchComplete: _propTypes2.default.bool,
  isSearchPending: _propTypes2.default.bool,
  changePage: _propTypes2.default.func,
  detailPath: _propTypes2.default.string,

  // TODO: rename facets => availableFilters?
  facets: _propTypes2.default.object,
  activeFilters: _propTypes2.default.array.isRequired,
  addFilter: _propTypes2.default.func.isRequired,
  removeFilter: _propTypes2.default.func.isRequired
} : {};

exports.default = SearchView;
module.exports = exports['default'];