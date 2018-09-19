import "react-native";
import React from "react";
import App from "App";

import renderer from "react-test-renderer";

describe("Jest", () => {
  it("should expect true to be truthy", () => {
    expect(true).toBeTruthy();
  });
});

describe("App", () => {
  it("should render", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
