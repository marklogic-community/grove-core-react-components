import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Facets from './Facets';

describe('<Facets/>', () => {
  it('renders', () => {
    expect(shallow(<Facets />).length).toEqual(1);
  });
});
