import React, { Component } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import Map from "./components/app/index";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="background">
        {/* <MainContainer /> */}
        <Map />
      </div>
    );
  }
}

export default App;
