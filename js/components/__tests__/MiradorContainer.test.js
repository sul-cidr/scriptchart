/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MiradorContainer from '../MiradorContainer';


describe('MiradorContainer test', () => {
  it('MiradorContainer should match snapshot', () => {
    const wrapper = shallow(<MiradorContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
