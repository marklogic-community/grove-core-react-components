import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import MLSearchResults from './MLSearchResults';
import MLSearchResult from './MLSearchResult';

import { mockResults } from './test/mockData';

describe('<MLSearchResults />', () => {
  it('renders empty results without crashing', () => {
    shallow(<MLSearchResults results={[]} />);
  });

  it('renders message when no results found', () => {
    const rendered = render(<MLSearchResults results={[]} />);
    expect(rendered.text()).toContain('No results');
  });

  it('renders results without crashing', () => {
    shallow(<MLSearchResults results={mockResults} />);
  });

  it('renders an MLSearchResult for each result', () => {
    const wrapper = shallow(<MLSearchResults results={mockResults} />);
    expect(wrapper.find(MLSearchResult).length).toEqual(mockResults.length);
  });
});
