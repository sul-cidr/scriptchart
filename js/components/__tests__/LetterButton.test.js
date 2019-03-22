/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import LetterButton from "../LetterButton";

describe("LetterButton test", () => {
  it("LetterButton should match snapshot", () => {
    const component = renderer.create(<LetterButton />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
