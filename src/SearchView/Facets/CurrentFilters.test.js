import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CurrentFilters from './CurrentFilters';

describe('<CurrentFilters/>', () => {
  it('renders without constraints', () => {
    expect(shallow(
      <CurrentFilters
        constraints={{}}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });

  it('renders with constraints', () => {
    expect(shallow(
      <CurrentFilters
        constraints={{Test: {and: [{name: 'value1'}, {name: 'value2'}]}}}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });
});
