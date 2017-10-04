import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import MLDetailView from './MLDetailView';

describe('<MLDetailView />', () => {
  it('renders without crashing', () => {
    expect(shallow(<MLDetailView />).length).toEqual(1);
  });

  it('includes the word detail', () => {
    // Have to mount to see into a child. Is there a better way?
    const wrapper = render(<MLDetailView />);
    expect(wrapper.text()).toContain('detail');
  });
});
