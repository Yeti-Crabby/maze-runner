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

import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './App';

render(<App />, document.getElementById('contents'));
