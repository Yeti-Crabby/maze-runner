/**
 * ************************************
 *
 * @module  index.js
 * @author
 * @date
 * @description entry point for application.  Hangs React app off of #contents in index.html
 *
 * ************************************
 */

 import React from 'react';
 import { render } from 'react-dom';
//  import { Provider } from 'react-redux';
 import App from './App.jsx';


 render(
   // wrap the App in the Provider and pass in the store
  //  <Provider>
     <App />,
  //  </Provider>,
   document.getElementById('contents')
 );


