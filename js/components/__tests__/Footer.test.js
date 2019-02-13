/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Footer from '../Footer';


describe('Footer test', () => {
  it('Footer should match snapshot', () => {
    const component = renderer.create(<Footer
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
