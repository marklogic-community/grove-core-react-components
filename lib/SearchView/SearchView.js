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

  SearchView.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.stagedSearch.page !== this.props.stagedSearch.page ||
    // Intentionally using != to test object reference (ie, is it the
    // same object?) Because our Redux flow will swap out the constraints
    // object on any change, but keep it referentially the same otherwise
    nextProps.stagedSearch.constraints != this.props.stagedSearch.constraints) {
      // TODO: DRY up with this.search()?
      nextProps.runSearch(nextProps.stagedSearch);
    }
  };

  SearchView.prototype.search = function search() {
    this.props.runSearch(this.props.stagedSearch);
  };

  SearchView.prototype.render = function render() {
    return _react2.default.createElement(
      _reactBootstrap.Row,
      null,
      _react2.default.createElement(
        _reactBootstrap.Col,
        { md: 3 },
        _react2.default.createElement(_Facets2.default, {
          availableConstraints: this.props.facets,
          activeConstraints: this.props.activeConstraints,
          addConstraint: this.props.addConstraint,
          removeConstraint: this.props.removeConstraint
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
        this.props.isSearchComplete && _react2.default.createElement(_SearchResponseView2.default, {
          error: this.props.error,
          results: this.props.results,
          executionTime: this.props.executionTime,
          total: this.props.total,
          page: this.props.page,
          totalPages: this.props.totalPages,
          handlePageSelection: this.handlePageSelection,
          detailPath: this.props.detailPath,
          resultComponent: this.props.resultComponent
        })
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
  changePage: _propTypes2.default.func,
  detailPath: _propTypes2.default.string,

  // TODO: rename facets => activeConstraints?
  facets: _propTypes2.default.object,
  addConstraint: _propTypes2.default.func.isRequired,
  removeConstraint: _propTypes2.default.func.isRequired
} : {};

exports.default = SearchView;
module.exports = exports['default'];