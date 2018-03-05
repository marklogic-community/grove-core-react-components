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
    const wrapper = shallow(
      <SingleConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={() => {}}
      />
    );
    expect(wrapper.length).toEqual(1);
    expect(
      wrapper
        .find('.nonSelectedConstraintValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
  });

  it('handles selected values differently', () => {
    const wrapper = shallow(
      <SingleConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }]}
        addConstraint={() => {}}
      />
    );
    expect(
      wrapper
        .find('.nonSelectedConstraintValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(false);
    expect(
      wrapper
        .find('.selectedConstraintValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
  });
});
