/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from '../Tabs';


describe('Tabs test', () => {
  it('Tabs should match snapshot', () => {
    const component = renderer.create(<Tabs
      tabList={[]} activeTab={undefined} changeActiveTab={undefined} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
