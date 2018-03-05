import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SingleConstraintList from './SingleConstraintList';

describe('<SingleConstraintList/>', () => {
  it('renders without values', () => {
    expect(shallow(
      <SingleConstraintList
        values={[]}
        addConstraint={() => {}}
      />
    ).length).toEqual(1);
  });

  it('renders with values', () => {
    expect(shallow(
      <SingleConstraintList
        values={['value1', 'value2']}
        addConstraint={() => {}}
      />
    ).length).toEqual(1);
  });
});
