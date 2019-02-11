
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Image from '../Image';


describe('Image test', () => {
  it('Image should match snapshot', () => {
    const component = renderer.create(<Image
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
