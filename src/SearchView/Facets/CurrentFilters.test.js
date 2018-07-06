import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CurrentFilters from './CurrentFilters';

describe('<CurrentFilters/>', () => {
  it('renders without filters', () => {
    expect(shallow(
      <CurrentFilters
        filters={[]}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });

  it('renders with filters', () => {
    expect(shallow(
      <CurrentFilters
        filters={[{
          constraint: 'Test',
          mode: 'and',
          value: ['value1', 'value2']
        }]}
        removeFilter={() => {}}
      />
    ).length).toEqual(1);
  });
});
