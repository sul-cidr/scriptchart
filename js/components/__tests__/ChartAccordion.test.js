/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ChartAccordion from "../ChartAccordion";
import { defaultManuscripts } from "../__mocks__/appDataMock";
import letters from "../letters.json";

jest.mock("../ManuscriptItem");

describe("ChartAccordion test", () => {
  it("ChartAccordion should match snapshot", () => {
    const hiddenManuscriptIDs = defaultManuscripts.slice(0, 3).map(ms => ms.id);
    const hiddenLetterIDs = letters.slice(0, 3).map(lt => lt.id);

    const wrapper = shallow(
      <ChartAccordion
        hiddenManuscripts={hiddenManuscriptIDs}
        columnManuscripts={defaultManuscripts}
        hiddenLetters={hiddenLetterIDs}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
