import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Redirect } from 'react-router-dom'
import NavBar from '../components/NavBar'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import UnCheckedIcon from 'material-ui/svg-icons/toggle/check-box-outline-blank'
import CheckedIcon from 'material-ui/svg-icons/toggle/check-box'
import Paper from 'material-ui/Paper'

class OrganiseContainer extends Component {
  state = {
    name: '',
    email: '',
    rolesChecked: {},
    roles: [],
    redirectTo: null
  }

  componentDidMount() {
    firebase.database().ref('/challenges/' + this.props.match.params.id + '/roles').once('value').then((snapshot) => {
      const roles = snapshot.val()
      if (roles) {
        this.setState({ roles })
      }
    })
  }

  handleOnTextChange = e => {
    return (
      this.setState({ [e.target.name] : e.target.value })
    )
  }

  handleOnSubmit() {
    const roleObj = this.getFilteredRoleObj()
    firebase.database().ref('/challenges/' + this.props.match.params.id + '/roles').update(roleObj).then(() => {
      if (Object.keys(roleObj).includes('role7')){
        this.setState({ redirectTo: '/organise/' + this.props.match.params.id + '/location' })
      } else {
        this.setState({ redirectTo: '/challenge/' + this.props.match.params.id })
      }
    })
  }

  getFilteredRoleObj() {
    const roleObj = Object.keys(this.state.rolesChecked).reduce((p, c) => {
      if (this.state.rolesChecked[c]) {
        p[c] = this.state.roles[c]
        p[c]['organiser'] = { name: this.state.name, email: this.state.email }
      }
      return p
    }, {})

    return roleObj
  }

  updateCheck(roleId) {
   this.setState((oldState) => {
     oldState.rolesChecked[roleId] = !oldState.rolesChecked[roleId]
     return oldState
   })
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <div>
        <NavBar title="Organise" />
        <Paper style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', padding: 30, marginTop: 50 }}>
        <TextField
          hintText='Name'
          style={{ marginTop: 10, width: '60%' }}
          value={this.state.name}
          onChange={this.handleOnTextChange.bind(this)}
          name="name"
        /><br />
        <TextField
          hintText='Email'
          style={{ marginTop: 10, width: '60%' }}
          value={this.state.email}
          onChange={this.handleOnTextChange.bind(this)}
          name="email"
        /><br />
        <h2 style={{ fontFamily: 'Muli' }}>Available Organiser Roles</h2>
        {
          Object.values(this.state.roles).map((role, index) => {
            if (!role.organiser) {
              return (
                <Checkbox
                key={index}
                uncheckedIcon={<UnCheckedIcon style={{fill: "#000"}} />}
                checkedIcon={<CheckedIcon style={{fill: "#38c098"}} />}
                style={{ marginBottom: 10 }}
                label={role.title + '  ' + role.description}
                checked={this.state.rolesChecked[role.id]}
                onCheck={() => this.updateCheck(role.id)}
              />
              )
            }
          })
        }
        <RaisedButton
          backgroundColor='#38c098'
          labelColor='#fff'
          style={{ marginTop: 40 }}
          label="Next"
          onClick={this.handleOnSubmit.bind(this)}
        />
      </Paper>
      </div>
    )
  }
}

export default OrganiseContainer
