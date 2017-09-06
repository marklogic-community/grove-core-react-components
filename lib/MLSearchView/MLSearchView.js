'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _MLSearchBar = require('./MLSearchBar');

var _MLSearchBar2 = _interopRequireDefault(_MLSearchBar);

var _MLSearchResults = require('./MLSearchResults');

var _MLSearchResults2 = _interopRequireDefault(_MLSearchResults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(_MLSearchResults2.default, {
              className: 'ml-search-results',
              results: this.props.results || [] })
          )
        )
      )
    );
  };

  return MLSearch;
}(_react.Component);

exports.default = MLSearch;
module.exports = exports['default'];