/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import DashTabs from "../DashTabs";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import { defaultManuscripts } from "../ManuscriptsLoader";
import { tableData, formData } from "../__mocks__/appDataMock";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faTable,
  faImage
} from "@fortawesome/free-solid-svg-icons";
library.add(faBookOpen, faTable, faImage);

jest.mock('../DragTable');

const DDContext = DragDropContext(HTML5Backend)(DashTabs);

describe("DashTabs test", () => {
  it("DashTabs should match snapshot", () => {
    const component = renderer.create(
      <DDContext
        formData={formData}
        tableData={tableData}
        manuscripts={defaultManuscripts}
        onRowMove={() => {}}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
