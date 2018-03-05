import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SingleConstraintList from './SingleConstraintList';

describe('<SingleConstraintList/>', () => {
  it('renders without values', () => {
    expect(
      shallow(<SingleConstraintList values={[]} addConstraint={() => {}} />)
        .length
    ).toEqual(1);
  });

  it('renders with values', () => {
    expect(
      shallow(
        <SingleConstraintList
          values={[{ name: 'value1', count: 1 }, { name: 'value2', count: 2 }]}
          addConstraint={() => {}}
        />
      ).length
    ).toEqual(1);
  });
});
