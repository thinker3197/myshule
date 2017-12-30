import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App'
import registerServiceWorker from './registerServiceWorker'

export const config = {
    apiKey: "AIzaSyCNKKWH1DLInT8ybjtflp5v5GGwmag35eg",
    authDomain: "myshule-368f1.firebaseapp.com",
    databaseURL: "https://myshule-368f1.firebaseio.com",
    projectId: "myshule-368f1",
    storageBucket: "myshule-368f1.appspot.com",
    messagingSenderId: "937811266582"
};

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'))
registerServiceWorker()
