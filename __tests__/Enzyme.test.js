import React from "react";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const MainContainer = require("../client/containers/MainContainer");

configure({ adapter: new Adapter() });

describe("React unit tests", () => {
  describe("LabeledText", () => {
    let wrapper;
    const props = {
      label: "Mega",
      text: "Markets",
    };

    beforeAll(() => {
      wrapper = shallow(<LabeledText {...props} />);
    });

    it("Renders a <p> tag with the label in bold", () => {
      expect(wrapper.type()).toEqual("p");
      expect(wrapper.text()).toEqual("Mega: Markets");
      expect(wrapper.find("strong").text()).toMatch("Mega");
    });
  });

  describe("MarketDisplay", () => {
    const props = {};

    beforeEach(() => {
      addCard = jest.fn();
      deleteCard = jest.fn();
      wrapper = shallow(
        <MarketDisplay {...props} addCard={addCard} deleteCard={deleteCard} />
      );
    });

    it("should be a div with className marketBox", () => {
      expect(wrapper.is("div")).toBe(true);
      expect(wrapper.is(".marketBox")).toBe(true);
    });
  });
});
