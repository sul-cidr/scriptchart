/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import DragAndDropTable from '../DragAndDropTable';
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

const DDContext = DragDropContext(HTML5Backend);

describe('DragAndDropTable test', () => {
  it('DragAndDropTable should match snapshot', () => {
    const component = renderer.create(<DDContext><DragAndDropTable /></DDContext>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
