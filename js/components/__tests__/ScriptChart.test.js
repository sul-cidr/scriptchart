/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import ScriptChart from '../ScriptChart';
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

const DDContext = DragDropContext(HTML5Backend)(ScriptChart);

describe('ScriptChart test', () => {
  it('ScriptChart should match snapshot', () => {
    const component = renderer.create(<DDContext />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
