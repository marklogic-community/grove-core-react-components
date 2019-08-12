import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import OpenLayersMap from './OpenLayersMap';

describe('<OpenLayersMap />', () => {
  it('renders without crashing', () => {
    expect(shallow(<OpenLayersMap />).length).toEqual(1);
  });
});
