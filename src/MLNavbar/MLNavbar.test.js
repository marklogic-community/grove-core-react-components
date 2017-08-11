import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import MLNavbar from './MLNavbar';

it('renders without crashing', () => {
  expect(shallow(<MLNavbar />).length).toEqual(1);
});

it('includes the title', () => {
  // Have to mount to see into a child. Is there a better way?
  const wrapper = render(<MLNavbar title='MyNavbarTitle'/>);
  expect(wrapper.text()).toContain('MyNavbarTitle');
});
