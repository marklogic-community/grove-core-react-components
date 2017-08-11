import React from 'react';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import './MLSearchBar.css';

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
      <form role="search">
        <FormGroup controlId="searchBox">
          <InputGroup>
            <FormControl
              className="ml-qtext-input"
              type="text"
              placeholder={placeholder}
              value={qtext}
              onChange={onQtextChange}
            />
            <InputGroup.Button type="submit">
              <Button
                onClick={onSearchExecute}
                className='ml-execute-search'
                disabled={searchPending}
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

export default MLSearchBar;
