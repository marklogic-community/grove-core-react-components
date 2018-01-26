import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import MLSearchResult from './MLSearchResult';
import Fade from '../animations/Fade';

var DefaultNoResults = function DefaultNoResults() {
  return React.createElement(
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
  return React.createElement(
    'div',
    { className: 'ml-search-results' },
    React.createElement(
      TransitionGroup,
      { appear: true },
      results.map(function (result) {
        return React.createElement(
          Fade,
          { duration: 500, key: result.uri },
          React.createElement(ResultComponent, { result: result,
            detailPath: detailPath
          })
        );
      }),
      results.length === 0 && React.createElement(
        Fade,
        { duration: 500 },
        React.createElement(NoResults, null)
      )
    )
  );
};

MLSearchResults.defaultProps = {
  resultComponent: MLSearchResult,
  noResults: DefaultNoResults
};

export default MLSearchResults;