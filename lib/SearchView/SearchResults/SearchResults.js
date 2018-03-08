'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _reactBootstrap = require('react-bootstrap');

var _CardResult = require('./CardResult');

var _CardResult2 = _interopRequireDefault(_CardResult);

var _ListResult = require('./ListResult');

var _ListResult2 = _interopRequireDefault(_ListResult);

var _Fade = require('../../animations/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultNoResults = function DefaultNoResults() {
  return _react2.default.createElement(
    _reactBootstrap.Col,
    { md: 12 },
    _react2.default.createElement(
      'p',
      null,
      _react2.default.createElement('br', null),
      _react2.default.createElement(
        'strong',
        null,
        'No results matched your search.'
      )
    )
  );
};

var SearchResults = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults(props) {
    _classCallCheck(this, SearchResults);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var resultComponentName = props.resultComponent ? '' : 'Cards';
    _this.state = {
      resultComponentName: resultComponentName,
      resultComponent: props.resultComponent || _CardResult2.default
    };
    _this.setResultType = _this.setResultType.bind(_this);
    return _this;
  }

  SearchResults.prototype.setResultType = function setResultType(e) {
    var resultComponent = void 0;
    if (e === 'Cards') {
      resultComponent = _CardResult2.default;
    } else if (e === 'List') {
      resultComponent = _ListResult2.default;
    } else {
      throw 'Invalid Result Type: ' + e;
    }
    this.setState({
      resultComponentName: e,
      resultComponent: resultComponent
    });
  };

  SearchResults.prototype.render = function render() {
    var _this2 = this;

    if (!this.props.results) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      null,
      this.props.results.length > 0 && _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 12, md: 6, style: { float: 'right' } },
        _react2.default.createElement(
          _reactBootstrap.ButtonToolbar,
          { style: { float: 'right', marginBottom: '10px' } },
          _react2.default.createElement(
            _reactBootstrap.ToggleButtonGroup,
            {
              type: 'radio',
              name: 'result-options',
              value: this.state.resultComponentName,
              onChange: this.setResultType
            },
            _react2.default.createElement(
              _reactBootstrap.ToggleButton,
              { value: 'Cards' },
              'Cards'
            ),
            _react2.default.createElement(
              _reactBootstrap.ToggleButton,
              { value: 'List' },
              'List'
            )
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Row,
        { className: 'ml-search-results' },
        _react2.default.createElement(
          _reactBootstrap.Col,
          { md: 12 },
          _react2.default.createElement(
            _TransitionGroup2.default,
            { appear: true },
            this.props.results.map(function (result) {
              return _react2.default.createElement(
                _Fade2.default,
                { duration: 500, key: result.uri },
                _react2.default.createElement(_this2.state.resultComponent, {
                  result: result,
                  detailPath: _this2.props.detailPath || '/detail'
                })
              );
            }),
            this.props.results.length === 0 && _react2.default.createElement(
              _Fade2.default,
              { duration: 500 },
              _react2.default.createElement(this.props.noResults, null)
            )
          )
        )
      )
    );
  };

  return SearchResults;
}(_react2.default.Component);

SearchResults.defaultProps = {
  noResults: DefaultNoResults
};

SearchResults.propTypes = process.env.NODE_ENV !== "production" ? {
  resultComponent: _propTypes2.default.func,
  noResults: _propTypes2.default.func,
  results: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    uri: _propTypes2.default.string
  })).isRequired,
  detailPath: _propTypes2.default.string
} : {};

exports.default = SearchResults;
module.exports = exports['default'];