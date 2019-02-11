
// Auto-generated do not edit


/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../Header';


describe('Header test', () => {
  it('Header should match snapshot', () => {
    const component = renderer.create(<Header
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
