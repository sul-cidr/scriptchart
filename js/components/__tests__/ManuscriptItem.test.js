/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ManuscriptItem from '../ManuscriptItem';


describe('ManuscriptItem test', () => {
  it('ManuscriptItem should match snapshot', () => {
    const component = renderer.create(<ManuscriptItem
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
