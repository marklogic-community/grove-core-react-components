import React from 'react';
import { shallow, render, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import { mockResults } from './test/mockData';
import SearchView from './SearchView';
import SearchResponseView from './SearchResponseView';

const enterQueryText = (text, wrapper) => {
  const typing = {target: {value: text}};
  wrapper.find('input.ml-qtext-input').simulate('change', typing);
};

describe('<SearchView />', () => {

  it('renders without crashing', () => {
    shallow(<SearchView />);
  });

  const executedSearch = {
    total: 25,
    executionTime: 0.01091,
    results: mockResults
  };

  it('renders, integrated with children, without crashing', () => {
    mount(<SearchView executedSearch={executedSearch} />);
  });

  it('renders <SearchResponseView> if search complete', () => {
    const wrapper = shallow(<SearchView isSearchComplete={true} />);
    expect(wrapper.find(SearchResponseView).length).toEqual(1);
  });

  it('does not render <SearchResponseView> if search incomplete', () => {
    const wrapper = shallow(<SearchView isSearchComplete={false} />);
    expect(wrapper.find(SearchResponseView).length).toEqual(0);
  });

  // TODO: do we have to actually pass queryText? We've already captured it
  it('runs a search', () => {
    const searchSpy = createSpy();
    const wrapper = mount(
      <SearchView runSearch={searchSpy} queryText='Waldo' />
    );
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(searchSpy).toHaveBeenCalled();
  });

  it('displays search results', () => {
    const wrapper = render(<SearchView executedSearch={executedSearch}/>);
    wrapper.find('.ml-search-results').text('Another Search Result');
  });

  it('uses queryText from props', () => {
    const wrapper = mount(
      <SearchView queryText={'from-props'}/>
    );
    expect(wrapper.find('input.ml-qtext-input').props().value).toEqual('from-props');
  });

  it('calls props.handleQueryTextChange on typing', () => {
    const spy = createSpy();
    const wrapper = mount(<SearchView handleQueryTextChange={spy}/>);
    enterQueryText('query', wrapper);
    expect(spy).toHaveBeenCalledWith('query');
    wrapper.find('button.ml-qtext-clear').simulate('click');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('returns a helpful error when no runSearch() provided');

});