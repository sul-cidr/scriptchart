/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import ColumnControls from "../ColumnControls";

describe("ColumnControls test", () => {
  it("ColumnControls should match snapshot", () => {
    const component = renderer.create(<ColumnControls />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
