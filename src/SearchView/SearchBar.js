import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from './Autocomplete';
import { Col, FormGroup, InputGroup, Glyphicon, Button } from 'react-bootstrap';

const SearchBar = ({
  queryText,
  onQueryTextChange,
  onSearchExecute,
  placeholder = 'Search...',
  searchPending,
  onSuggest,
  suggestions
}) => {
  return (
    <Col md={12} className="ml-search-bar">
      <form
        role="search"
        onSubmit={e => {
          e.preventDefault();
          onSearchExecute();
        }}
      >
        <FormGroup controlId="searchBox">
          <InputGroup>
            <Autocomplete
              onSuggest={onSuggest}
              suggestions={suggestions}
              onTermSelect={onQueryTextChange}
              userInput={queryText}
              placeholder={placeholder}
            />
            <InputGroup.Button>
              <Button
                className="ml-execute-search btn-raised"
                disabled={searchPending}
                type="submit"
              >
                {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                <Glyphicon glyph="search" /> Search
              </Button>
              <Button
                onClick={() => onQueryTextChange('')}
                className="ml-qtext-clear btn-raised"
              >
                <Glyphicon glyph="remove" /> Clear
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </Col>
  );
};

SearchBar.propTypes = {
  queryText: PropTypes.string.isRequired,
  onQueryTextChange: PropTypes.func,
  onQueryTextClear: PropTypes.func,
  onSearchExecute: PropTypes.func,
  placeholder: PropTypes.string,
  searchPending: PropTypes.bool,
  onSuggest: PropTypes.func,
  suggestions: PropTypes.array
};

export default SearchBar;
