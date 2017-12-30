import React, { Component } from 'react'
import * as firebase from 'firebase'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

/**
 * Dialogs can be nested. This example opens a Date Picker from within a Dialog.
 */

class StakeholderDialog extends Component {
  state = {
    name: 'Satu Mäkinen',
    email: 'satu@email.com',
    facebook: 'https://www.facebook.com/Innov8Tuusula/',
    comments: "I'd like to organise student social evenings in this space"
  }

  handleJoinMentor(pushKey) {
    const { name, email, facebook, comments } = this.state
    firebase.database().ref('/challenges/' + pushKey + '/stakeholders').push({
      name, email, facebook, comments
    }).then(() => {
      this.setState({ name: '', email: '', facebook: '', comments: ''})
      this.props.handleClose()
    })
  }

  handleTextChange = e => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  render() {
    return (
      <Dialog
        title="Join as Stakeholder"
        actions={[
         <RaisedButton
           backgroundColor='#38c098'
           labelColor='#fff'
           label="Join"
           onClick={() => this.handleJoinMentor(this.props.pushKey)}
         />
        ]}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
      >
        <div>
          <TextField
            hintText="Name"
            value={this.state.name}
            onChange={this.handleTextChange}
            id="name"
          /><br />
          <TextField
            hintText="Email"
            value={this.state.email}
            onChange={this.handleTextChange}
            id="email"
          /><br />
          <TextField
            hintText="Facebook"
            value={this.state.facebook}
            onChange={this.handleTextChange}
            id="facebook"
          /><br />
          <TextField
            hintText="Your comment"
            multiLine={true}
            rows={5}
            value={this.state.comments}
            onChange={this.handleTextChange}
            id="comments"
          /><br />
        </div>
      </Dialog>
    )
  }
}

export default StakeholderDialog
