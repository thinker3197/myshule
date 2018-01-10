import React, { Component } from 'react'
import * as firebase from 'firebase'

import NavBar from '../components/NavBar'
import Paper from 'material-ui/Paper/Paper';

class LoginContainer extends Component {
  render() {
    return <div>
      <NavBar title='Login'/>
      <Paper style={{width: '50%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50}}></Paper>
    </div>
  }
}

export default LoginContainer