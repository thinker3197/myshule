import React from 'react'
import ReactDOM from 'react-dom'
import * as firebase from 'firebase'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const config = {
   apiKey: "AIzaSyDQm6BETDtnfS21iTZMGZdb9qjwwDa5JV8",
   authDomain: "ennovation-d0973.firebaseapp.com",
   databaseURL: "https://ennovation-d0973.firebaseio.com",
   projectId: "ennovation-d0973",
   storageBucket: "ennovation-d0973.appspot.com",
   messagingSenderId: "583809736430"
}
firebase.initializeApp(config)

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
  , document.getElementById('root'))
registerServiceWorker()
