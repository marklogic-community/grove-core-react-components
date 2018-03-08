'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _react3 = require('@storybook/react');

var _addonActions = require('@storybook/addon-actions');

var _SearchBar = require('./SearchBar');

var _SearchBar2 = _interopRequireDefault(_SearchBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global module */


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

    return _react2.default.createElement(_SearchBar2.default, {
      queryText: this.state.queryText,
      onQueryTextChange: function onQueryTextChange(queryText) {
        _this2.setState({ queryText: queryText });
        return (0, _addonActions.action)('onQueryTextChange')(queryText);
      },
      onSearchExecute: (0, _addonActions.action)('runSearch')
    });
  };

  return SearchBarWithState;
}(_react2.default.Component);

(0, _react3.storiesOf)('SearchView/SearchBar', module).add('default', function () {
  return _react2.default.createElement(SearchBarWithState, null);
});