import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import MLSearchResult from './MLSearchResult';
import Fade from '../animations/Fade';

var MLSearchResults = function MLSearchResults(_ref) {
  var results = _ref.results,
      detailPath = _ref.detailPath,
      ResultComponent = _ref.resultComponent;
  return React.createElement(
    'div',
    { className: 'ml-search-results' },
    React.createElement(
      TransitionGroup,
      { appear: true },
      results && results.map(function (result) {
        return React.createElement(
          Fade,
          { duration: 500, key: result.uri },
          React.createElement(ResultComponent, { result: result,
            detailPath: detailPath
          })
        );
      })
    )
  );
};

MLSearchResults.defaultProps = { resultComponent: MLSearchResult };

export default MLSearchResults;