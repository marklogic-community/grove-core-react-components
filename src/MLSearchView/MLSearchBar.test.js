import React from 'react';
import { shallow, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import MLSearchBar from './MLSearchBar';

describe ('<MLSearchBar />', () => {
  it('renders without crashing', () => {
    expect(shallow(<MLSearchBar />).length).toEqual(1);
  });

  it('displays queryText', () => {
    const wrapper = shallow(<MLSearchBar queryText='myQuery' />);
    expect(
      wrapper.find('.ml-qtext-input').props().value
    ).toEqual('myQuery');
  });

  it('shows a default placeholder', () => {
    const wrapper = shallow(<MLSearchBar />);
    expect(
      wrapper.find('.ml-qtext-input').props().placeholder
    ).toEqual('Search...');
  });

  it('allows custom placeholder', () => {
    const wrapper = shallow(<MLSearchBar placeholder='Please Search!' />);
    expect(
      wrapper.find('.ml-qtext-input').props().placeholder
    ).toEqual('Please Search!');
  });

  it('calls correct function on queryText change', () => {
    const myHandleChange = createSpy();
    const wrapper = shallow(<MLSearchBar onQueryTextChange={myHandleChange} />);
    wrapper.find('.ml-qtext-input').simulate('change');
    expect(myHandleChange).toHaveBeenCalled();
  });

  it('calls correct function on queryText clear', () => {
    const myHandleQueryTextClear = createSpy();
    const wrapper = shallow(<MLSearchBar onQueryTextClear={myHandleQueryTextClear} />);
    wrapper.find('.ml-qtext-clear').simulate('click');
    expect(myHandleQueryTextClear).toHaveBeenCalled();
  });

  it('calls correct function on search execute', () => {
    const mySearch = createSpy();
    const wrapper = mount(<MLSearchBar onSearchExecute={mySearch} />);
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(mySearch).toHaveBeenCalled();
  });

  it('disables search button when search is pending', () => {
    const mySearch = createSpy();
    // Have to call mount to stop enzyme from clicking disabled button
    const wrapper = mount(
      <MLSearchBar onSearchExecute={mySearch} searchPending={true} />
    );
    wrapper.find('button.ml-execute-search').simulate('click');
    expect(mySearch).toNotHaveBeenCalled();
  });

});
