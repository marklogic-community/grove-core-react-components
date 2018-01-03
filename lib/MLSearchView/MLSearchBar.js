'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './MLSearchBar.css';

var MLSearchBar = function MLSearchBar(_ref) {
  var queryText = _ref.queryText,
      onQueryTextChange = _ref.onQueryTextChange,
      onQueryTextClear = _ref.onQueryTextClear,
      onSearchExecute = _ref.onSearchExecute,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? 'Search...' : _ref$placeholder,
      searchPending = _ref.searchPending;

  return _react2.default.createElement(
    _reactBootstrap.Col,
    { md: 12, className: 'ml-search-bar' },
    _react2.default.createElement(
      'form',
      { role: 'search', onSubmit: onSearchExecute },
      _react2.default.createElement(
        _reactBootstrap.FormGroup,
        { controlId: 'searchBox' },
        _react2.default.createElement(
          _reactBootstrap.InputGroup,
          null,
          _react2.default.createElement(_reactBootstrap.FormControl, {
            className: 'ml-qtext-input',
            type: 'text',
            placeholder: placeholder,
            value: queryText,
            onChange: onQueryTextChange
          }),
          _react2.default.createElement(
            _reactBootstrap.InputGroup.Button,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              {
                className: 'ml-execute-search',
                disabled: searchPending,
                type: 'submit'
              },
              _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'search' }),
              ' Search'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: onQueryTextClear, className: 'ml-qtext-clear' },
              _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' }),
              ' Clear'
            )
          )
        )
      )
    )
  );
};

MLSearchBar.propTypes = process.env.NODE_ENV !== "production" ? {
  queryText: _propTypes2.default.string.isRequired,
  onQueryTextChange: _propTypes2.default.func,
  onQueryTextClear: _propTypes2.default.func,
  onSearchExecute: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  searchPending: _propTypes2.default.bool
} : {};

exports.default = MLSearchBar;
module.exports = exports['default'];