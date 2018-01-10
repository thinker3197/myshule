import React, { Component } from 'react'
import * as firebase from 'firebase'

import NavBar from '../components/NavBar'
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginContainer extends Component {
  state = {
    username: '',
    password: ''
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onUserLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      console.error(errorCode + ' : ' + errorMessage);
    });
  }

  render() {
    return <div>
      <NavBar title='Login'/>
      <Paper style={{width: '40%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50}}>
        <TextField
          style={{marginTop: 10, width: '100%'}}
          hintText="Username"
          name="username"
          value={this.state.username}
          onChange={this.handleTextChange}
        />
        <TextField
          style={{marginTop: 10, width: '100%'}}
          hintText="Password"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleTextChange}
        />
        <br/>
        <RaisedButton
          backgroundColor='#38c098'
          labelColor='#fff'
          style={{marginTop: 20}}
          disabled={this.state.loading}
          label="Login"
          onClick={this.onUserLogin}
        />
      </Paper>
    </div>
  }
}

export default LoginContainer