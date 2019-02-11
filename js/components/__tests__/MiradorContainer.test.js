/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import MiradorContainer from '../MiradorContainer';


describe('MiradorContainer test', () => {
  it('MiradorContainer should match snapshot', () => {
    const component = renderer.create(<MiradorContainer
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
