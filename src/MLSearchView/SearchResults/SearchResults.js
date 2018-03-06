import React from 'react';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import CardResult from './CardResult';
import Fade from '../../animations/Fade';

const DefaultNoResults = () => <p>No results matched your search.</p>;

const SearchResults = ({
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

SearchResults.defaultProps = {
  resultComponent: CardResult,
  noResults: DefaultNoResults
};

export default SearchResults;
