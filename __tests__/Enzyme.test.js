import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Navbar from "../client/Navbar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

configure({ adapter: new Adapter() });

describe("Navbar", () => {
  let wrapper;
  const id = ["startNode", "targetNode", "wallNode", "clearBoard", "algo"];
  const children = [
    "Set Start Node",
    "Set Target Node",
    "Add Walls",
    "Clear Board",
    "Run Algorithm",
  ];
  beforeAll(() => {
    const props = {
      className: "button",
      id: "nodeId",
      color: "color",
    };
    wrapper = shallow(
      <Navbar>
        <AppBar>
          <Button {...props} />
        </AppBar>
      </Navbar>
    );
  });

  it("contains 5 buttons", () => {
    expect(wrapper.find(Button)).toHaveLength(5);
  });

  describe("contains button that", () => {
    it("contains correct classnames", () => {
      expect(
        wrapper.find(Button).map((node) => node.props().className)
      ).toEqual([
        "navbarButton",
        "navbarButton",
        "navbarButton",
        "navbarButton",
        "navbarButton",
      ]);
    });

    it("contains correct id names", () => {
      expect(wrapper.find(Button).map((node) => node.props().id)).toEqual(id);
    });

    it("contains correct names", () => {
      expect(wrapper.find(Button).map((node) => node.props().children)).toEqual(
        children
      );
    });

    it("contains correct colors", () => {
      expect(wrapper.find(Button).map((node) => node.props().color)).toEqual([
        "inherit",
        "inherit",
        "inherit",
        "inherit",
        "inherit",
      ]);
    });

    it("contains correct number of onClicks", () => {
      expect(
        wrapper.find(Button).map((node) => node.props().onClick)
      ).toHaveLength(5);
    });
  });
});
