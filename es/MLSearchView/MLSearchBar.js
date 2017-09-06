import React from 'react';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
// import './MLSearchBar.css';

var MLSearchBar = function MLSearchBar(_ref) {
  var qtext = _ref.qtext,
      onQtextChange = _ref.onQtextChange,
      onQtextClear = _ref.onQtextClear,
      onSearchExecute = _ref.onSearchExecute,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? 'Search...' : _ref$placeholder,
      searchPending = _ref.searchPending;

  return React.createElement(
    Col,
    { md: 12, className: 'ml-search-bar' },
    React.createElement(
      'form',
      { role: 'search', onSubmit: onSearchExecute },
      React.createElement(
        FormGroup,
        { controlId: 'searchBox' },
        React.createElement(
          InputGroup,
          null,
          React.createElement(FormControl, {
            className: 'ml-qtext-input',
            type: 'text',
            placeholder: placeholder,
            value: qtext,
            onChange: onQtextChange
          }),
          React.createElement(
            InputGroup.Button,
            null,
            React.createElement(
              Button,
              {
                className: 'ml-execute-search',
                disabled: searchPending,
                type: 'submit'
              },
              React.createElement(Glyphicon, { glyph: 'search' }),
              ' Search'
            ),
            React.createElement(
              Button,
              { onClick: onQtextClear, className: 'ml-qtext-clear' },
              React.createElement(Glyphicon, { glyph: 'remove' }),
              ' Clear'
            )
          )
        )
      )
    )
  );
};

export default MLSearchBar;