import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';

var SearchBar = function SearchBar(_ref) {
  var queryText = _ref.queryText,
      onQueryTextChange = _ref.onQueryTextChange,
      onSearchExecute = _ref.onSearchExecute,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === undefined ? 'Search...' : _ref$placeholder,
      searchPending = _ref.searchPending;

  return React.createElement(
    Col,
    { md: 12, className: 'ml-search-bar' },
    React.createElement(
      'form',
      {
        role: 'search',
        onSubmit: function onSubmit(e) {
          e.preventDefault();
          onSearchExecute();
        }
      },
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
            value: queryText,
            onChange: function onChange(e) {
              return onQueryTextChange(e.target.value);
            }
          }),
          React.createElement(
            InputGroup.Button,
            null,
            React.createElement(
              Button,
              {
                className: 'ml-execute-search btn-raised',
                disabled: searchPending,
                type: 'submit'
              },
              React.createElement(Glyphicon, { glyph: 'search' }),
              ' Search'
            ),
            React.createElement(
              Button,
              {
                onClick: function onClick() {
                  return onQueryTextChange('');
                },
                className: 'ml-qtext-clear btn-raised'
              },
              React.createElement(Glyphicon, { glyph: 'remove' }),
              ' Clear'
            )
          )
        )
      )
    )
  );
};

SearchBar.propTypes = process.env.NODE_ENV !== "production" ? {
  queryText: PropTypes.string.isRequired,
  onQueryTextChange: PropTypes.func,
  onQueryTextClear: PropTypes.func,
  onSearchExecute: PropTypes.func,
  placeholder: PropTypes.string,
  searchPending: PropTypes.bool
} : {};

export default SearchBar;