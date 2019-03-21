/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import ManuscriptMenu from "../ManuscriptMenu";
import { defaultManuscripts } from "../ManuscriptsLoader";

describe("ManuscriptMenu test", () => {
  it("ManuscriptMenu should match snapshot", () => {
    const component = renderer.create(
      <ManuscriptMenu manuscripts={defaultManuscripts} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
