import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MultiConstraintList from './MultiConstraintList';

describe('<MultiConstraintList/>', () => {
  it('renders', () => {
    expect(
      shallow(<MultiConstraintList values={[]} addConstraint={() => {}} />)
        .length
    ).toEqual(1);
  });

  it('renders with values', () => {
    const wrapper = shallow(
      <MultiConstraintList
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

  it('shows a single selected value', () => {
    const wrapper = shallow(
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }]}
        removeConstraint={() => {}}
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
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }, { value: 'value2' }]}
        addConstraint={() => {}}
        removeConstraint={() => {}}
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
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={addConstraintSpy}
      />
    );
    wrapper
      .find('.nonSelectedConstraintValue .ml-facet-add-pos')
      .first()
      .simulate('change');
    expect(addConstraintSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addConstraintSpy).toHaveBeenCalledWith('value1');
  });

  it('does not select a value when it is checked, then unchecked', () => {
    const addConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={addConstraintSpy}
      />
    );
    const checkbox = wrapper
      .find('.nonSelectedConstraintValue .ml-facet-add-pos')
      .first();
    checkbox.simulate('change');
    checkbox.simulate('change');
    expect(addConstraintSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addConstraintSpy).toNotHaveBeenCalled();
  });

  // TODO
  it('allows two values to be selected', () => {
    const addConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={addConstraintSpy}
      />
    );
    const checkboxes = wrapper.find('.nonSelectedConstraintValue .ml-facet-add-pos');
    checkboxes.first().simulate('change');
    checkboxes.last().simulate('change');
    expect(addConstraintSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addConstraintSpy).toHaveBeenCalledWith('value1');
    expect(addConstraintSpy).toHaveBeenCalledWith('value2');
  });

  it('allows a value to be de-selected', () => {
    const removeConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={() => {}}
        removeConstraint={removeConstraintSpy}
        selectedValues={[{ value: 'value1' }]}
      />
    );
    wrapper
      .find('.ml-facet-remove-constraint')
      .simulate('change');
    expect(removeConstraintSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(removeConstraintSpy).toHaveBeenCalledWith('value1');
  });

  it('does not de-select value unchecked then re-checked', () => {
    const removeConstraintSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiConstraintList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addConstraint={() => {}}
        removeConstraint={removeConstraintSpy}
        selectedValues={[{ value: 'value1' }]}
      />
    );
    const checkbox = wrapper.find('.ml-facet-remove-constraint');
    checkbox.simulate('change');
    checkbox.simulate('change');
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(removeConstraintSpy).toNotHaveBeenCalled();
  });
});
