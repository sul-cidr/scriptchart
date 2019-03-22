/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import ScriptChart from "../ScriptChart";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import letters from "../letters.json";
import { tableData, defaultManuscripts } from "../__mocks__/appDataMock";

jest.mock("../DragTable");

const DDContext = DragDropContext(HTML5Backend)(ScriptChart);

describe("ScriptChart test", () => {
  const formData = {
    showBinarized: true,
    letterExamples: 3,
    imageSize: "Small",
    selectedShelfmarks: ["Vat. Syr. 112", "Vat. Syr. 140", "BL. Add. 17224"],
    manuscripts: [],
    letters: [
      {
        id: 2,
        letter: "Alaph (Angular)",
        is_script: true,
        display: "ܐ",
        script: "estrangela"
      },
      {
        id: 25,
        letter: "Lamadh (Final, open)",
        is_script: true,
        display: "ܠ",
        script: "estrangela"
      },
      {
        id: 37,
        letter: "Sadhe",
        is_script: true,
        display: "ܨ",
        script: "estrangela"
      }
    ]
  };
  it("ScriptChart should match snapshot", () => {
    const component = renderer.create(
      <DDContext
        hiddenLetters={letters.slice(0, 3)}
        rowLetters={letters.slice(0, 5)}
        columnManuscripts={defaultManuscripts.slice(0, 4)}
        hiddenManuscripts={defaultManuscripts.slice(0, 3)}
        tableData={tableData}
        formData={formData}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
