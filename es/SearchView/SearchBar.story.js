function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchBar from './SearchBar';

var SearchBarWithState = function (_React$Component) {
  _inherits(SearchBarWithState, _React$Component);

  function SearchBarWithState(props) {
    _classCallCheck(this, SearchBarWithState);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      queryText: ''
    };
    return _this;
  }

  SearchBarWithState.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(SearchBar, {
      queryText: this.state.queryText,
      onQueryTextChange: function onQueryTextChange(queryText) {
        _this2.setState({ queryText: queryText });
        return action('onQueryTextChange')(queryText);
      },
      onSearchExecute: action('runSearch')
    });
  };

  return SearchBarWithState;
}(React.Component);

storiesOf('SearchView/SearchBar', module).add('default', function () {
  return React.createElement(SearchBarWithState, null);
});