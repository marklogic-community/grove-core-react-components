import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import MLSearchResult from './MLSearchResult';
import Fade from '../animations/Fade';

const DefaultNoResults = () => <p>No results matched your search.</p>;

const MLSearchResults = ({
  results, detailPath,
  noResults: NoResults, resultComponent: ResultComponent
}) => {
  if (!results) {return null;}
  return (
    <div className="ml-search-results">
      <TransitionGroup appear={true}>
        {
          results.map(result =>
            <Fade duration={500} key={result.uri}>
              <ResultComponent result={result}
                detailPath={detailPath}
              />
            </Fade>
          )
        }
        {
          (results.length === 0) && <Fade duration={500}><NoResults/></Fade>
        }
      </TransitionGroup>
    </div>
  );
};

MLSearchResults.defaultProps = {
  resultComponent: MLSearchResult,
  noResults: DefaultNoResults
};

export default MLSearchResults;
