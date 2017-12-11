'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _MLSearchBar = require('./MLSearchBar');

var _MLSearchBar2 = _interopRequireDefault(_MLSearchBar);

var _MLSearchResponseView = require('./MLSearchResponseView');

var _MLSearchResponseView2 = _interopRequireDefault(_MLSearchResponseView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    return _react2.default.createElement(
      _reactBootstrap.Grid,
      null,
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        _react2.default.createElement(_reactBootstrap.Col, { md: 3 }),
        _react2.default.createElement(
          _reactBootstrap.Col,
          { md: 9 },
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(_MLSearchBar2.default, {
              qtext: this.props.qtext,
              onQtextChange: this.handleQtextChange,
              onQtextClear: this.handleQtextClear,
              onSearchExecute: this.search
            })
          ),
          this.props.isSearchComplete && _react2.default.createElement(_MLSearchResponseView2.default, {
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
}(_react.Component);

MLSearchView.propTypes = process.env.NODE_ENV !== "production" ? {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: _propTypes2.default.object, // TODO: say more about shape of this
  error: _propTypes2.default.string,
  results: _propTypes2.default.array, // TODO: say more about shape of this
  executionTime: _propTypes2.default.number,
  total: _propTypes2.default.number,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  isSearchComplete: _propTypes2.default.bool,
  qtext: _propTypes2.default.string.isRequired,
  handleQtextChange: _propTypes2.default.func,
  runSearch: _propTypes2.default.func,
  changePage: _propTypes2.default.func,
  detailPath: _propTypes2.default.string
} : {};

exports.default = MLSearchView;
module.exports = exports['default'];