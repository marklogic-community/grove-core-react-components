import React from 'react';
import { shallow, render, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import { mockResults } from './test/mockData';
import MLSearchView from './MLSearchView';
import MLSearchResponseView from './MLSearchResponseView';

const enterQueryText = (text, wrapper) => {
  const typing = {target: {value: text}};
  wrapper.find('input.ml-qtext-input').simulate('change', typing);
};

describe('<MLSearchView />', () => {

  it('renders without crashing', () => {
    shallow(<MLSearchView />);
  });

  const executedSearch = {
    total: 25,
    executionTime: 0.01091,
    results: mockResults
  };

  it('renders, integrated with children, without crashing', () => {
    mount(<MLSearchView executedSearch={executedSearch} />);
  });

  it('renders <MLSearchResponseView> if search complete', () => {
    const wrapper = shallow(<MLSearchView isSearchComplete={true} />);
    expect(wrapper.find(MLSearchResponseView).length).toEqual(1);
  });

  it('does not render <MLSearchResponseView> if search incomplete', () => {
    const wrapper = shallow(<MLSearchView isSearchComplete={false} />);
    expect(wrapper.find(MLSearchResponseView).length).toEqual(0);
  });

  // TODO: do we have to actually pass queryText? We've already captured it
  it('runs a search', () => {
    const searchSpy = createSpy();
    const wrapper = mount(
      <MLSearchView runSearch={searchSpy} queryText='Waldo' />
    );
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(searchSpy).toHaveBeenCalled();
  });

  it('displays search results', () => {
    const wrapper = render(<MLSearchView executedSearch={executedSearch}/>);
    wrapper.find('.ml-search-results').text('Another Search Result');
  });

  it('uses queryText from props', () => {
    const wrapper = mount(
      <MLSearchView queryText={'from-props'}/>
    );
    expect(wrapper.find('input.ml-qtext-input').props().value).toEqual('from-props');
  });

  it('calls props.handleQueryTextChange on typing', () => {
    const spy = createSpy();
    const wrapper = mount(<MLSearchView handleQueryTextChange={spy}/>);
    enterQueryText('query', wrapper);
    expect(spy).toHaveBeenCalledWith('query');
    wrapper.find('button.ml-qtext-clear').simulate('click');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('returns a helpful error when no runSearch() provided');

});
