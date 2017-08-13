import React from 'react';
import { shallow, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import { mockResults } from './test/mockData';
import MLSearchView from './MLSearchView';

describe('<MLSearchView />', () => {

  it('renders without crashing', () => {
    shallow(<MLSearchView />);
  });

  it('renders, integrated with children, without crashing', () => {
    mount(<MLSearchView />);
  });

  it('runs a search', () => {
    const searchSpy = createSpy().andReturn({
      results: mockResults
    });
    const wrapper = mount(<MLSearchView runSearch={searchSpy}/>);
    const typing = {target: {value: 'Waldo'}};
    wrapper.find('.ml-qtext-input').simulate('change', typing);
    wrapper.find('.ml-execute-search').simulate('click');
    expect(searchSpy).toHaveBeenCalledWith({qtext: 'Waldo'});
    wrapper.find('.ml-search-results').text('Another Search Result');
  });

  it('returns a helpful error when no runSearch() provided');

});
