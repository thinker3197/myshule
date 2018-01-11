import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import './styles/styles.css';
import registerServiceWorker from './registerServiceWorker'

var config = {
    apiKey: "AIzaSyAcaOAI9WF1UZbs1j50juLCnqx4z8LFhuM",
    authDomain: "myshule-56c7a.firebaseapp.com",
    databaseURL: "https://myshule-56c7a.firebaseio.com",
    projectId: "myshule-56c7a",
    storageBucket: "myshule-56c7a.appspot.com",
    messagingSenderId: "523282295991"
};
firebase.initializeApp(config);

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'))
registerServiceWorker()
