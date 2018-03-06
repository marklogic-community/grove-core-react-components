import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import MLSearchResponseView from './MLSearchResponseView';
import SearchResults from './SearchResults/SearchResults';
import MLSearchMetrics from './MLSearchMetrics';

describe('<MLSearchResponseView />', () => {

  it('renders', () => {
    shallow(<MLSearchResponseView />);
  });

  it('renders metrics and results if search successful', () => {
    const wrapper = shallow(<MLSearchResponseView />);
    expect(wrapper.find(MLSearchMetrics).length).toEqual(1);
    expect(wrapper.find(SearchResults).length).toEqual(1);
  });

  it('does not render metrics and results if there is an error', () => {
    const wrapper = shallow(<MLSearchResponseView error={'Some error'} />);
    expect(wrapper.find(MLSearchMetrics).length).toEqual(0);
    expect(wrapper.find(SearchResults).length).toEqual(0);
  });
});
