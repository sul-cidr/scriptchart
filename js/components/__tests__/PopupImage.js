/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import PopupImage from "../PopupImage";

describe("PopupImage test", () => {
  it("PopupImage should match snapshot", () => {
    const component = renderer.create(<PopupImage />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
