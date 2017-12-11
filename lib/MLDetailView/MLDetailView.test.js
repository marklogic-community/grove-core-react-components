import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MLDetailView from './MLDetailView';

describe('<MLDetailView />', () => {
  it('renders without crashing', () => {
    expect(shallow(<MLDetailView loadDetail={() => {}} />).length).toEqual(1);
  });
});
