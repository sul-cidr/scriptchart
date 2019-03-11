/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import DashTabs from '../DashTabs';
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

const DDContext = DragDropContext(HTML5Backend)(DashTabs);

describe('DashTabs test', () => {
  it('DashTabs should match snapshot', () => {
    const component = renderer.create(<DDContext />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});