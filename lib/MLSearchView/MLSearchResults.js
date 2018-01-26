'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _MLSearchResult = require('./MLSearchResult');

var _MLSearchResult2 = _interopRequireDefault(_MLSearchResult);

var _Fade = require('../animations/Fade');

var _Fade2 = _interopRequireDefault(_Fade);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultNoResults = function DefaultNoResults() {
  return _react2.default.createElement(
    'p',
    null,
    'No results matched your search.'
  );
};

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results,
      detailPath = _ref.detailPath,
      NoResults = _ref.noResults,
      ResultComponent = _ref.resultComponent;

  if (!results) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: 'ml-search-results' },
    _react2.default.createElement(
      _TransitionGroup2.default,
      { appear: true },
      results.map(function (result) {
        return _react2.default.createElement(
          _Fade2.default,
          { duration: 500, key: result.uri },
          _react2.default.createElement(ResultComponent, { result: result,
            detailPath: detailPath
          })
        );
      }),
      results.length === 0 && _react2.default.createElement(
        _Fade2.default,
        { duration: 500 },
        _react2.default.createElement(NoResults, null)
      )
    )
  );
};

MLSearchResults.defaultProps = {
  resultComponent: _MLSearchResult2.default,
  noResults: DefaultNoResults
};

exports.default = MLSearchResults;
module.exports = exports['default'];