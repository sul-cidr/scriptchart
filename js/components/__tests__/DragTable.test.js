/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import DragTable from "../DragTable";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { columns, defaultManuscripts } from "../__mocks__/appDataMock";

const DDContext = DragDropContext(HTML5Backend)(DragTable);

describe("DragTable test", () => {
  it("DragTable should match snapshot", () => {
    const wrapper = shallow(
      <DDContext
        columns={columns}
        hiddenManuscripts={defaultManuscripts.slice(0, 3)}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
