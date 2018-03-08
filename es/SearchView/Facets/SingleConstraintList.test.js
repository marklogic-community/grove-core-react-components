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

  it('shows a single selected value', () => {
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

  it('shows two selected values', () => {
    const wrapper = shallow(
      <SingleConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }, { value: 'value2' }]}
        addConstraint={() => {}}
      />
    );
    expect(
      wrapper
        .find('.selectedConstraintValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
    expect(
      wrapper
        .find('.selectedConstraintValues')
        .contains(<span title="value2"> value2</span>)
    ).toBe(true);
  });

  it('allows a value to be selected', () => {
    const addConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <SingleConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={addConstraintSpy}
      />
    );
    wrapper
      .find('.nonSelectedConstraintValues .ml-facet-add-pos')
      .first()
      .simulate('click');
    expect(addConstraintSpy).toHaveBeenCalledWith('value1');
  });

  it('allows a value to be de-selected', () => {
    const removeConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <SingleConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={() => {}}
        removeConstraint={removeConstraintSpy}
        selectedValues={[{ value: 'value1' }]}
      />
    );
    wrapper
      .find('.selectedConstraintValues .ml-facet-remove-constraint')
      .simulate('click');
    expect(removeConstraintSpy).toHaveBeenCalledWith('value1');
  });
});
