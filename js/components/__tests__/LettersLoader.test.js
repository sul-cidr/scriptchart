/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import LettersLoader from "../LettersLoader";

import letters from "../letters.json";

describe("LettersLoader test", () => {
  it("LettersLoader should match snapshot", () => {
    const component = renderer.create(
      <LettersLoader selectedLetters={letters.slice(0, 2)} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
