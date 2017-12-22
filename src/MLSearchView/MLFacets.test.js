import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MLFacets from './MLFacets';

describe('<MLFacets/>', () => {
  it('renders', () => {
    expect(shallow(<MLFacets />).length).toEqual(1);
  });
});
