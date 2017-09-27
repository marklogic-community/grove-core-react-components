import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import { mockResults } from './test/mockData';

import MLSearchResult from './MLSearchResult';
import MLSearchSnippet from './MLSearchSnippet.js';

describe('<MLSearchResult />', () => {
  const result = mockResults[0];

  it('renders snippets', () => {
    const wrapper = shallow(<MLSearchResult result={result} />);
    expect(
      wrapper.find(MLSearchSnippet).length
    ).toEqual(
      result.matches.length
    );
  });

  it('renders the label provided', () => {
    const rendered = render(<MLSearchResult result={result} />);
    expect(rendered.text()).toContain(result.label);
  });
});
