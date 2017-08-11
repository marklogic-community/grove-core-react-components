import React from 'react';
import { shallow, mount } from 'enzyme';
import MLSearchView from './MLSearchView';

it('renders without crashing', () => {
  shallow(<MLSearchView />);
});

it('renders, integrated with children, without crashing', () => {
  mount(<MLSearchView />);
});
