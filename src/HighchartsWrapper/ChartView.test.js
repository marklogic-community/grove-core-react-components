import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ChartView from './ChartView';

describe('<ChartView />', () => {
  it('renders without crashing', () => {
    expect(shallow(<ChartView />).length).toEqual(1);
  });
});
