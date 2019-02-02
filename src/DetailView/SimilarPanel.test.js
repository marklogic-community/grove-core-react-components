import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SimilarPanel from './SimilarPanel';

describe('<SimilarPanel />', () => {
  it('renders without crashing', () => {
    const similar = [{ uri: '/fetched-doc.json', id: '%2Ffetched-doc.json' }];
    expect(shallow(<SimilarPanel ids={similar} />).length).toEqual(1);
  });
});
