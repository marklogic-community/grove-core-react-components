'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

var _SearchResults = require('./SearchResults/SearchResults');

var _SearchResults2 = _interopRequireDefault(_SearchResults);

var _SearchMetrics = require('./SearchMetrics');

var _SearchMetrics2 = _interopRequireDefault(_SearchMetrics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchResponseView = function SearchResponseView(props) {
  return _react2.default.createElement(
    _reactBootstrap.Row,
    null,
    _react2.default.createElement(
      _reactBootstrap.Col,
      { md: 12 },
      _react2.default.createElement(
        _reactBootstrap.Row,
        null,
        props.error ? _react2.default.createElement(
          _reactBootstrap.Col,
          { md: 12 },
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'There was an error performing your search.'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'The server sent the following error message:\xA0',
            _react2.default.createElement(
              'span',
              { className: 'text-danger' },
              props.error
            )
          )
        ) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { md: 6 },
            _react2.default.createElement(_SearchMetrics2.default, { time: props.executionTime, total: props.total })
          ),
          _react2.default.createElement(_SearchResults2.default, {
            results: props.results || [],
            detailPath: props.detailPath,
            resultComponent: props.resultComponent,
            isSearchPending: props.isSearchPending
          }),
          props.totalPages > 1 && _react2.default.createElement(
            _reactBootstrap.Col,
            { md: 12 },
            _react2.default.createElement(_reactBootstrap.Pagination, {
              items: props.totalPages,
              maxButtons: 10,
              boundaryLinks: true,
              activePage: props.page,
              onSelect: props.handlePageSelection
            })
          )
        )
      )
    )
  );
};

SearchResponseView.propTypes = process.env.NODE_ENV !== "production" ? {
  error: _propTypes2.default.string,
  results: _propTypes2.default.array,
  executionTime: _propTypes2.default.number,
  total: _propTypes2.default.number,
  page: _propTypes2.default.number,
  totalPages: _propTypes2.default.number,
  handlePageSelection: _propTypes2.default.func
} : {};

exports.default = SearchResponseView;
module.exports = exports['default'];