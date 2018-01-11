import React, { Component } from 'react'
import * as firebase from 'firebase'

import NavBar from '../components/NavBar'
import Paper from 'material-ui/Paper/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import { Redirect } from 'react-router-dom';

class LoginContainer extends Component {
  state = {
    username: '',
    password: '',
    action: 'Login',
    errorText: '',
    redirectTo: null,
    loading: false
  }

  handleTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  startLoading = () => {
    this.setState({
      loading: true
    });
  }

  stopLoading = () => {
    this.setState({
      loading: false
    });
  }

  activateSignUp = () => {
    setTimeout(() => {
      this.setState({
        action: 'Sign Up',
        errorText: ''
      });
    }, 1500);
  }

  onUserSignUp = () => {
    const _self = this;

    _self.startLoading();

    firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password)
    .then((res) => {
      _self.stopLoading();

      _self.setState({
        redirectTo: '/'
      });
    }) 
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    
      _self.handleError(errorCode, errorMessage);
      _self.stopLoading();
    });
  }

  onUserSignOut = () => {
    const _self = this;

    _self.startLoading();

    firebase.auth().signOut().then(function() {
      _self.stopLoading();

      _self.setState({
        redirectTo: '/'
      });
    }).catch(function(error) {
      console.error(error);

      _self.stopLoading();
    });
  }

  handleError = (errorCode, errorMessage) => {
    console.error(errorCode + ' : ' + errorMessage);

    switch (errorCode) {
      case 'auth/user-not-found':
        this.setState({
          errorText: 'User does not exist. Sign Up instead!'
        });
        break;
    
      default:
        this.setState({
          errorText: errorMessage
        });
        break;
    }
  }

  onUserLogin = () => {
    const _self = this;

    _self.startLoading();

    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
    .then((res) => {
      _self.stopLoading();

      _self.setState({
        redirectTo: '/'
      });
    }) 
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      
      _self.stopLoading();
      _self.handleError(errorCode, errorMessage);

      if(errorCode === 'auth/user-not-found') {

        _self.activateSignUp();
      }
    });
  }

  render() {
    const user = firebase.auth().currentUser;

    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo}  />
    }

    if(!user) {
      return <div>
        <NavBar title={this.state.action === 'Login' ? 'Login' : 'Sign Up'}/>
        <Paper style={{width: '40%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50}}>
          <TextField
            style={{marginTop: 10, width: '100%'}}
            hintText="Username"
            name="username"
            errorText={this.state.errorText}
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
            label={this.state.action}
            onClick={this.state.action === 'Login' ? this.onUserLogin : this.onUserSignUp}
          />
        </Paper>
      </div>
    } else {
      return <div>
        <NavBar title='Login'/>
        <Paper style={{width: '40%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50}}>
          <List>
            <ListItem
              disabled={true}
              leftAvatar={<Avatar>{user.email.slice(0,1)}</Avatar>}
            >
              {user.email}
            </ListItem>
          </List>
          <RaisedButton
            style={{marginLeft: '75%'}}
            backgroundColor='#38c098'
            labelColor='#fff'
            style={{marginTop: 20}}
            disabled={this.state.loading}
            label='Sign Out'
            onClick={this.onUserSignOut}
          />
        </Paper>
      </div>
    }
  }
}

export default LoginContainer