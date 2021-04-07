const fs = require("fs");
const path = require("path");
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const MainContainer = require("../client/containers/MainContainer");

configure({ adapter: new Adapter() });

describe("test", () => {
  it("this is testing", () => {
    expect("").toEqual("");
  });

  it("this is another test", () => {
    expect("4").toBe("4");
  });
});

// MainContainer => testing grid
// component did mount
// ensure all grids = 30 x 15, ensure that we only have 30 x 15 (component did mount)

// algorithm - WITHOUT WALL!!
// given point A, point B takes the certain paths(e.g. [{0, 0}, {0, 1}, {0, 2} ... ])

// path length/distance test: given two nodes, target and head

// mouse event handlers
//   button changes property upon click

// navigation bar => functionality tests

// mode change
//   mode changes upon navbar click

// Navbar => state?

// ensure event handlers are passed down

// render test - DOM

// enzyme
