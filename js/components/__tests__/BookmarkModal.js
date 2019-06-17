/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import BookmarkModal from "../BookmarkModal";

describe("BookmarkModal test", () => {
  it("BookmarkModal should match snapshot", () => {
    const component = renderer.create(<BookmarkModal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});