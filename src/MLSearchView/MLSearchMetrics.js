import React from 'react';
import PropTypes from 'prop-types';

const MLSearchMetrics = ({time, total}) => {
  return (
    <span>Found {total} results in {time.toFixed(3)} seconds.</span>
  );
};

MLSearchMetrics.propTypes = {
  time: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired
};

export default MLSearchMetrics;
