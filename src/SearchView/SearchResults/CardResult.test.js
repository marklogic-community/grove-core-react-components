import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { mockResults } from '../test/mockData';

import CardResult from './CardResult';
import SearchSnippet from './SearchSnippet.js';

describe('<CardResult />', () => {
  const result = mockResults[0];

  it('renders snippets', () => {
    const wrapper = shallow(<CardResult result={result} />);
    expect(
      wrapper.find(SearchSnippet).length
    ).toEqual(
      result.matches.length
    );
  });

  // TODO: Problem with testing <Link> outside a <Router>
  // it('renders the label provided', () => {
  //   const rendered = render(<CardResult result={result} />);
  //   expect(rendered.text()).toContain(result.label);
  // });
});
