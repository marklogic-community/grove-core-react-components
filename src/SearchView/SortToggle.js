import React from 'react';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const SortToggle = ({ searchSorts, changeSort }) => {
  const options = [];
  // Ths searchSorts comes in as an array of one
  if (Array.isArray(searchSorts) && searchSorts.length > 0) {
    for (let sort of searchSorts[0].state) {
      options.push({ value: sort.name, label: sort.name });
    }
  }
  return (
    <Dropdown
      onChange={changeSort}
      options={options}
      placeholder="Change sort..."
    />
  );
};

export default SortToggle;
