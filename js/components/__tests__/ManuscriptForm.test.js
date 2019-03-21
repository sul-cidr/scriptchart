/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ManuscriptForm from '../ManuscriptForm';
import { defaultManuscripts } from '../ManuscriptsLoader';


describe('ManuscriptForm test', () => {
  it('ManuscriptForm should match snapshot', () => {
    const component = renderer.create(<ManuscriptForm manuscripts={defaultManuscripts}
       />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
