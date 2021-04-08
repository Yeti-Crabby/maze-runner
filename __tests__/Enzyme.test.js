import React from "react";
import { configure, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LabeledText from "../client/components/LabeledText";
import App from "../client/App.jsx";
import Navbar from "../client/Navbar";

import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import unwrap from "@material-ui/core/test-utils/unwrap";

import { createMount, createShallow } from "@material-ui/core/test-utils";

// import MarketDisplay from '../client/components/MarketDisplay';
// import MarketsDisplay from '../client/components/MarketsDisplay';

configure({ adapter: new Adapter() });

describe("React unit tests", () => {
  describe("Navbar", () => {
    let wrapper;
    const mock1 = jest.fn();
    // const mock2 = jest.fn();
    // const mock3 = jest.fn();
    // const mock4 = jest.fn();
    // const mock5 = jest.fn();
    const props = {};

    const id = ["startNode", "targetNode", "wallNode", "clearBoard", "algo"];

    beforeAll(() => {
      wrapper = Enzyme.shallow(<Navbar onClick={mock1} />);
    });

    it("click", () => {
      //wrapper.find(Button).map((node) => node.props().id)).toEqual(id
      wrapper.find(Button).at(0).simulate("click");
      //expect(mock1.mock.calls).toHaveBeenCalled();
      //   <div>
      //   <WithStyles(ForwardRef(AppBar)) position="static" className="navbarContainer">
      //     <WithStyles(ForwardRef(Toolbar))>
      //       <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[undefined]} id="startNode" color="inherit">
      //         Set Start Node
      //       </WithStyles(ForwardRef(Button))>
      //       <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[undefined]} id="targetNode" color="inherit">
      //         Set Target Node
      //       </WithStyles(ForwardRef(Button))>
      //       <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[undefined]} id="wallNode" color="inherit">
      //         Add Walls
      //       </WithStyles(ForwardRef(Button))>
      //       <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[undefined]} id="clearBoard" color="inherit">
      //         Clear Board
      //       </WithStyles(ForwardRef(Button))>
      //       <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[undefined]} id="algo" color="inherit">
      //         Run Algorithm
      //       </WithStyles(ForwardRef(Button))>
      //     </WithStyles(ForwardRef(Toolbar))>
      //   </WithStyles(ForwardRef(AppBar))>
      // </div>
    });

    it("contains buttons with correct id names", () => {
      expect(wrapper.find(Button).map((node) => node.props().id)).toEqual(id);
    });

    it("contains 5 buttons", () => {
      // in case nested component needs to be explicitly wrapped
      // const navWrapper = shallow(
      //   <Navbar>
      //     <AppBar>
      //       <Toolbar />
      //     </AppBar>
      //   </Navbar>
      // );

      expect(wrapper.find(Button)).toHaveLength(5);
    });
    it("contanis buttons with functioning methods", () => {
      // wrapper.find(Button).forEach((node) => node.simulate("click"));
      // expect(mock1.mock.calls).toHaveLength(5);
    });
  });

  describe("button", () => {
    let wrapper;
  });

  // const mock1 = jest.fn();
  // const props = {
  //   className: "navbarButton",
  //   onClick: mock1,
  //   id: "",
  //   color: "",
  // };

  // const setup = () => {
  //   const wrapper = mount(<AppBar {...props} />);
  //   return {
  //     props,
  //     wrapper,
  //   };
  // };

  // const { wrapper2 } = setup();

  describe("mount", () => {
    let shallow;
    let mock1 = jest.fn();
    let mount;
    const props = {
      className: "navbarButton",
      onClick: mock1,
      id: "startNode",
      color: "inherit",
    };

    beforeEach(() => {
      mount = createMount();
    });

    afterEach(() => {
      mount.cleanUp();
    });

    it("renders a <Button /> component with expected props", () => {
      const wrapper = mount(<Button {...props} />);
      // wrapper.find("onClick").simulate("click");
      // expect(props.onClick).toHaveBeenCalled();

      // expect(console.log("wrapper.props():", wrapper.props()));
      expect(wrapper.props().className).toEqual("navbarButton");
      expect(wrapper.props().onClick).toBeDefined();
    });

    it("should trigger onClick on <Button /> on mouse click", () => {
      // const wrapper = mount(<Button {...props} />);

      // wrapper.find("button").simulate("click");
      // expect(wrapper.props().onClick.calls.length).toEqual(1);

      // const mockCallBack = jest.fn();
      // let shallow = createShallow();
      // const button = shallow(<Button onClick={mockCallBack}>Ok!</Button>);
      // button.find(Button).simulate("click");
      // expect(mockCallBack.mock.calls.length).toEqual(1);

      // const UnwrappedComponent: any = unwrap((Navbar as unknown as React.ReactElement<any>));

      // const wrapperComp = shallow(unwrap(<UnwrappedComponent />));
      // jest.spyOn(wrapperComp.instance(), "loadAllData");
      // const button = wrapperComp.find(Button);
      // button.simulate("click");
      // wrapperComp.update();
      // expect(wrapperComp.instance().loadAllData).toHaveBeenCalledTimes(1);
      shallow = createShallow();
      const wrapper = shallow(<Navbar />);
      //use sinon.spy( object, method) to spy the method, instead of sinon.spy(func)
      // const spy = jest.spyOn(wrapper.renderer._instance._instance, "click");
      // const spy = jest.spyOn(wrapper.instance(), "handleButtonClick");
      console.log("wrapper.instance():", wrapper.instance().renderer);
      // wrapper.renderer._instance._instance.click();
      // expect(spy.called).to.be.true;
    });
  });
});

// wrapper.debug(): <WithStyles(ForwardRef(Button)) className="navbarButton" onClick={[Function: mockConstructor] { _isMockFunction: true, getMockImplementation: [Function (anonymous)], mock: { calls: [], instances: [], invocationCallOrder: [], results: [] }, mockClear: [Function (anonymous)], mockReset: [Function (anonymous)], mockRestore: [Function (anonymous)], mockReturnValueOnce: [Function (anonymous)], mockResolvedValueOnce: [Function (anonymous)], mockRejectedValueOnce: [Function (anonymous)], mockReturnValue: [Function (anonymous)], mockResolvedValue: [Function (anonymous)], mockRejectedValue: [Function (anonymous)], mockImplementationOnce: [Function (anonymous)], mockImplementation: [Function (anonymous)], mockReturnThis: [Function (anonymous)], mockName: [Function (anonymous)], getMockName: [Function (anonymous)] }} id="startNode" color="inherit">
//       <ForwardRef(Button) classes={{...}} className="navbarButton" onClick={[Function: mockConstructor] { _isMockFunction: true, getMockImplementation: [Function (anonymous)], mock: { calls: [], instances: [], invocationCallOrder: [], results: [] }, mockClear: [Function (anonymous)], mockReset: [Function (anonymous)], mockRestore: [Function (anonymous)], mockReturnValueOnce: [Function (anonymous)], mockResolvedValueOnce: [Function (anonymous)], mockRejectedValueOnce: [Function (anonymous)], mockReturnValue: [Function (anonymous)], mockResolvedValue: [Function (anonymous)], mockRejectedValue: [Function (anonymous)], mockImplementationOnce: [Function (anonymous)], mockImplementation: [Function (anonymous)], mockReturnThis: [Function (anonymous)], mockName: [Function (anonymous)], getMockName: [Function (anonymous)] }} id="startNode" color="inherit">
//         <WithStyles(ForwardRef(ButtonBase)) className="MuiButton-root MuiButton-text navbarButton MuiButton-colorInherit" component="button" disabled={false} focusRipple={true} focusVisibleClassName="Mui-focusVisible" type="button" onClick={[Function: mockConstructor] { _isMockFunction: true, getMockImplementation: [Function (anonymous)], mock: { calls: [], instances: [], invocationCallOrder: [], results: [] }, mockClear: [Function (anonymous)], mockReset: [Function (anonymous)], mockRestore: [Function (anonymous)], mockReturnValueOnce: [Function (anonymous)], mockResolvedValueOnce: [Function (anonymous)], mockRejectedValueOnce: [Function (anonymous)], mockReturnValue: [Function (anonymous)], mockResolvedValue: [Function (anonymous)], mockRejectedValue: [Function (anonymous)], mockImplementationOnce: [Function (anonymous)], mockImplementation: [Function (anonymous)], mockReturnThis: [Function (anonymous)], mockName: [Function (anonymous)], getMockName: [Function (anonymous)] }} id="startNode">
//           <ForwardRef(ButtonBase) classes={{...}} className="MuiButton-root MuiButton-text navbarButton MuiButton-colorInherit" component="button" disabled={false} focusRipple={true} focusVisibleClassName="Mui-focusVisible" type="button" onClick={[Function: mockConstructor] { _isMockFunction: true, getMockImplementation: [Function (anonymous)], mock: { calls: [], instances: [], invocationCallOrder: [], results: [] }, mockClear: [Function (anonymous)], mockReset: [Function (anonymous)], mockRestore: [Function (anonymous)], mockReturnValueOnce: [Function (anonymous)], mockResolvedValueOnce: [Function (anonymous)], mockRejectedValueOnce: [Function (anonymous)], mockReturnValue: [Function (anonymous)], mockResolvedValue: [Function (anonymous)], mockRejectedValue: [Function (anonymous)], mockImplementationOnce: [Function (anonymous)], mockImplementation: [Function (anonymous)], mockReturnThis: [Function (anonymous)], mockName: [Function (anonymous)], getMockName: [Function (anonymous)] }} id="startNode">
//             <button className="MuiButtonBase-root MuiButton-root MuiButton-text navbarButton MuiButton-colorInherit" onBlur={[Function (anonymous)]} onClick={[Function: mockConstructor] { _isMockFunction: true, getMockImplementation: [Function (anonymous)], mock: { calls: [], instances: [], invocationCallOrder: [], results: [] }, mockClear: [Function (anonymous)], mockReset: [Function (anonymous)], mockRestore: [Function (anonymous)], mockReturnValueOnce: [Function (anonymous)], mockResolvedValueOnce: [Function (anonymous)], mockRejectedValueOnce: [Function (anonymous)], mockReturnValue: [Function (anonymous)], mockResolvedValue: [Function (anonymous)], mockRejectedValue: [Function (anonymous)], mockImplementationOnce: [Function (anonymous)], mockImplementation: [Function (anonymous)], mockReturnThis: [Function (anonymous)], mockName: [Function (anonymous)], getMockName: [Function (anonymous)] }} onFocus={[Function (anonymous)]} onKeyDown={[Function (anonymous)]} onKeyUp={[Function (anonymous)]} onMouseDown={[Function (anonymous)]} onMouseLeave={[Function (anonymous)]} onMouseUp={[Function (anonymous)]} onDragLeave={[Function (anonymous)]} onTouchEnd={[Function (anonymous)]} onTouchMove={[Function (anonymous)]} onTouchStart={[Function (anonymous)]} tabIndex={0} type="button" disabled={false} id="startNode">
//               <span className="MuiButton-label" />
//               <WithStyles(memo) center={false}>
//                 <ForwardRef(TouchRipple) classes={{...}} center={false}>
//                   <span className="MuiTouchRipple-root">
//                     <TransitionGroup component={{...}} exit={true} childFactory={[Function: childFactory]} />
//                   </span>
//                 </ForwardRef(TouchRipple)>
//               </WithStyles(memo)>
//             </button>
//           </ForwardRef(ButtonBase)>
//         </WithStyles(ForwardRef(ButtonBase))>
//       </ForwardRef(Button)>
//     </WithStyles(ForwardRef(Button))>
