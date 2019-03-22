/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import ManuscriptsLoader from "../ManuscriptsLoader";
import { defaultManuscripts } from "../__mocks__/appDataMock";

describe("ManuscriptsLoader test", () => {
  it("ManuscriptsLoader should match snapshot", () => {
    const component = renderer.create(
      <ManuscriptsLoader manuscripts={defaultManuscripts} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
