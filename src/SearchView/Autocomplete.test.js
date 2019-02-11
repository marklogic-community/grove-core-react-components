import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Autocomplete from './Autocomplete';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

describe('<Autocomplete />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Autocomplete />).length).toEqual(1);
  });

  it('displays starting text', () => {
    const wrapper = shallow(<Autocomplete userInput="myQuery" />);
    expect(wrapper.find(AsyncTypeahead).props().defaultInputValue).toEqual(
      'myQuery'
    );
  });

  it('shows a placeholder', () => {
    const wrapper = shallow(<Autocomplete placeholder="Please Search!" />);
    expect(wrapper.find(AsyncTypeahead).props().placeholder).toEqual(
      'Please Search!'
    );
  });
});
