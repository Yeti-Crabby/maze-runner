/**
 * ************************************
 *
 * @module  App.jsx
 * @authorM
 * @date
 * @description
 *
 * ************************************
 */

 import React, { Component } from 'react';
 import { render } from 'react-dom';
 import MainContainer from './containers/MainContainer.jsx';

class App extends Component {
  //  constructor(props) {
  //    super(props);
  //  }

  render() {
    console.log('OMFG IM IN APPs')
     return(
       <div>
        App.jsx?ss
        <MainContainer/>
       </div>
     );
   }
 }

 export default App;
