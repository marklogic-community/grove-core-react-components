import React from 'react';
import PropTypes from 'prop-types';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
// import './MLSearchBar.css';

const MLSearchBar = ({
  qtext,
  onQtextChange,
  onQtextClear,
  onSearchExecute,
  placeholder = 'Search...',
  searchPending
}) => {
  return (
    <Col md={12} className="ml-search-bar">
      <form role="search" onSubmit={onSearchExecute}>
        <FormGroup controlId="searchBox">
          <InputGroup>
            <FormControl
              className="ml-qtext-input"
              type="text"
              placeholder={placeholder}
              value={qtext}
              onChange={onQtextChange}
            />
            <InputGroup.Button>
              <Button
                className='ml-execute-search'
                disabled={searchPending}
                type="submit"
              >
                {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                <Glyphicon glyph="search"/> Search
              </Button>
              <Button onClick={onQtextClear} className='ml-qtext-clear'>
                <Glyphicon glyph="remove"/> Clear
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </Col>
  );
};

MLSearchBar.propTypes = {
  qtext: PropTypes.string.isRequired,
  onQtextChange: PropTypes.func,
  onQtextClear: PropTypes.func,
  onSearchExecute: PropTypes.func,
  placeholder: PropTypes.string,
  searchPending: PropTypes.bool
};

export default MLSearchBar;
