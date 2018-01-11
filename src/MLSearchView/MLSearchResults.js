import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import MLSearchResult from './MLSearchResult';
import Fade from '../animations/Fade';

const MLSearchResults = ({results, detailPath, resultComponent: ResultComponent}) => (
  <div className="ml-search-results">
    <TransitionGroup appear={true}>
      {
        results && results.map(result =>
          <Fade duration={500} key={result.uri}>
            <ResultComponent result={result}
              detailPath={detailPath}
            />
          </Fade>
        )
      }
    </TransitionGroup>
  </div>
);

MLSearchResults.defaultProps = { resultComponent: MLSearchResult };

export default MLSearchResults;
