import React from 'react';
import PropTypes from 'prop-types';

const SearchMetrics = ({ time, total }) => {
  if (!time && !total) {
    return null;
  }
  let announcement = 'Found ';
  if (total) {
    announcement = announcement + (total + ' ');
  }
  announcement = announcement + 'results';
  if (time) {
    announcement = announcement + (' in ' + time.toFixed(3) + ' seconds');
  }
  announcement = announcement + '.';
  return <span>{announcement}</span>;
};

SearchMetrics.propTypes = {
  time: PropTypes.number,
  total: PropTypes.number
};

export default SearchMetrics;
