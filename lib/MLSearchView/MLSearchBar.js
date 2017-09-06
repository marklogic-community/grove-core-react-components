'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './MLSearchBar.css';

var MLSearchBar = function MLSearchBar(_ref) {
  var qtext = _ref.qtext,
      onQtextChange = _ref.onQtextChange,
      onQtextClear = _ref.onQtextClear,
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
            value: qtext,
            onChange: onQtextChange
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
              { onClick: onQtextClear, className: 'ml-qtext-clear' },
              _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' }),
              ' Clear'
            )
          )
        )
      )
    )
  );
};

exports.default = MLSearchBar;
module.exports = exports['default'];