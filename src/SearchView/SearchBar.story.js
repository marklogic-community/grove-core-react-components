/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchBar from './SearchBar';

let suggestions = ['sample1', 'sample2', 'Example:', 'AnotherExample:'];

class SearchBarWithState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    };
  }

  render() {
    return (
      <SearchBar
        queryText={this.state.queryText}
        onQueryTextChange={queryText => {
          //due to queryText sometimes being an array
          if (queryText.length > 0) {
            queryText = queryText[0];
          }
          this.setState({ queryText: queryText });
          return action('onQueryTextChange')(queryText);
        }}
        onSearchExecute={action('runSearch')}
        onSuggest={action('getSuggestions')}
        suggestions={suggestions}
      />
    );
  }
}

storiesOf('SearchView/SearchBar', module).add('default', () => (
  <SearchBarWithState />
));
