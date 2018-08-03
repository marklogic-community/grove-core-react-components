import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import LoggedOut from './LoggedOut';

describe('<LoggedOut />', () => {
  it('renders without crashing', () => {
    expect(shallow(<LoggedOut />).length).toEqual(1);
  });
});
