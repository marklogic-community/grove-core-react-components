'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _MLSearchResults = require('./MLSearchResults');

var _MLSearchResults2 = _interopRequireDefault(_MLSearchResults);

var _MLSearchMetrics = require('./MLSearchMetrics');

var _MLSearchMetrics2 = _interopRequireDefault(_MLSearchMetrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MLSearchResponseView = function MLSearchResponseView(props) {
  return (
    // TODO: better error rendering
    _react2.default.createElement(
      'div',
      null,
      props.error && _react2.default.createElement(
        'p',
        null,
        props.error
      ),
      !props.error && _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { md: 12 },
            _react2.default.createElement(_MLSearchMetrics2.default, {
              time: props.executionTime,
              total: props.total
            })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(_MLSearchResults2.default, {
            className: 'ml-search-results',
            results: props.results || [],
            detailPath: props.detailPath
          })
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { md: 12 },
            _react2.default.createElement(_reactBootstrap.Pagination, {
              items: props.totalPages,
              maxButtons: 10,
              boundaryLinks: true,
              activePage: props.page,
              onSelect: props.handlePageSelection })
          )
        )
      )
    )
  );
};

MLSearchResponseView.propTypes = process.env.NODE_ENV !== "production" ? {
  error: _propTypes2.default.string,
  results: _propTypes2.default.array, // TODO: say more about shape of this
  executionTime: _propTypes2.default.number,
  total: _propTypes2.default.number,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  handlePageSelection: _propTypes2.default.func
} : {};

exports.default = MLSearchResponseView;
module.exports = exports['default'];