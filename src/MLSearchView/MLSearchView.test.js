import React from 'react';
import { shallow, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import { mockResults } from './test/mockData';
import MLSearchView from './MLSearchView';

const enterQtext = (text, wrapper) => {
  const typing = {target: {value: text}};
  wrapper.find('.ml-qtext-input').simulate('change', typing);
};

describe('<MLSearchView />', () => {

  it('renders without crashing', () => {
    shallow(<MLSearchView />);
  });

  it('renders, integrated with children, without crashing', () => {
    mount(<MLSearchView />);
  });

  // TODO: do we have to actually pass qtext? We've already captured it
  it('runs a search', () => {
    const searchSpy = createSpy();
    const wrapper = mount(
      <MLSearchView runSearch={searchSpy} qtext='Waldo' />
    );
    wrapper.find('.ml-execute-search').simulate('submit');
    expect(searchSpy).toHaveBeenCalledWith('Waldo');
  });

  it('displays search results', () => {
    const wrapper = mount(<MLSearchView results={mockResults}/>);
    wrapper.find('.ml-search-results').text('Another Search Result');
  });

  it('uses qtext from props', () => {
    const wrapper = mount(
      <MLSearchView qtext={'from-props'}/>
    );
    expect(wrapper.find('.ml-qtext-input').props().value).toEqual('from-props');
  });

  it('calls props.handleQtextChange on typing', () => {
    const spy = createSpy();
    const wrapper = mount(<MLSearchView handleQtextChange={spy}/>);
    enterQtext('query', wrapper);
    expect(spy).toHaveBeenCalledWith('query');
    wrapper.find('.ml-qtext-clear').simulate('click');
    expect(spy).toHaveBeenCalledWith('');
  });

  it('returns a helpful error when no runSearch() provided');

});
