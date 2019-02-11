import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.suggestions,
      isLoading: false
    };
  }

  onChange = query => {
    this.setState({ isLoading: true });
    this.props.onSuggest(query);
    this.setState({
      isLoading: false
    });
  };

  render() {
    return (
      <AsyncTypeahead
        className="ml-qtext-input"
        isLoading={this.state.isLoading}
        options={this.state.options}
        promptText={''}
        onSearch={this.onChange}
        onChange={this.props.onTermSelect}
        defaultInputValue={this.props.userInput || ''}
        searchText={this.props.loadText || 'loading...'}
        useCache={this.props.cache || false}
        delay={this.props.delay || 200}
        placeholder={this.props.placeholder || ''}
      />
    );
  }
}

Autocomplete.propTypes = {
  onSuggest: PropTypes.func,
  suggestions: PropTypes.array,
  onTermSelect: PropTypes.func,
  userInput: PropTypes.string,
  onChange: PropTypes.func,
  loadText: PropTypes.string,
  useCache: PropTypes.bool,
  delay: PropTypes.number,
  placeholder: PropTypes.string
};

export default Autocomplete;
