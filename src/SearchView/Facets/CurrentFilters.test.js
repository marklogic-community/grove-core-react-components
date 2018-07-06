import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CurrentFilters from './CurrentFilters';

describe('<CurrentFilters/>', () => {
  it('renders without filters', () => {
    expect(shallow(
      <CurrentFilters
        filters={{}}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });

  it('renders with filters', () => {
    expect(shallow(
      <CurrentFilters
        filters={{Test: {and: [{name: 'value1'}, {name: 'value2'}]}}}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });
});
