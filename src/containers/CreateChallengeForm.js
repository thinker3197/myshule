import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Redirect } from 'react-router-dom'

import NavBar from '../components/NavBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import LinearProgress from 'material-ui/LinearProgress';

const items = [
  <MenuItem key={1} value={'health'} primaryText="Health" />,
  <MenuItem key={2} value={'technology'} primaryText="Technology" />,
  <MenuItem key={3} value={'ed-tech'} primaryText="Ed-Tech" />,
  <MenuItem key={4} value={'art'} primaryText="Art" />,
  <MenuItem key={4} value={'environment'} primaryText="Environment" />,
  <MenuItem key={4} value={'transport'} primaryText="Transport" />,
  <MenuItem key={4} value={'social'} primaryText="Social" />,
  <MenuItem key={4} value={'other'} primaryText="Other" />,
]

const roles = {
  role1: {
    id: 'role1',
    title: 'Catering',
    description: ''
  },
  role2: {
    id: 'role2',
    title: 'Speakers',
    description: ''
  },
  role3: {
    id: 'role3',
    title: 'Funding',
    description: ''
  },
  role4: {
    id: 'role4',
    title: 'Marketting',
    description: ''
  },
  role5: {
    id: 'role5',
    title: 'Activities',
    description: ''
  },
  role6: {
    id: 'role6',
    title: 'Judges & Mentors',
    description: ''
  },
  role7: {
    id: 'role7',
    title: 'Location Planning',
    description: ''
  },
}

class CreateChallengeForm extends Component {
  state = {
    redirect: false,
    loading: false,
    name: 'Eeva-liisa Nieminen',
    email: 'eeva.liisa@gmail.com',
    title: 'Easy transportation systems',
    description: 'The city of tuusula recently shut down a train station which puts a strain on us to travel further by foot or bike.' +
    'We would need a community system which we can use to as a community to travel faster and easier.',
    category: 'transport'
  }

  handleCategoryChange = (event, index, value) => this.setState({ category: value })

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOnSubmit() {
    this.setState({ loading: true })
    console.log('this is state', this.state)
    const newChallenge = {
      creator: this.state.name,
      email: this.state.email,
      title: this.state.title,
      description: this.state.description,
      category: this.state.category,
      votes: 0,
      roles: roles
    }
    const pushKey = firebase.database().ref('/challenges').push()
    pushKey.set(newChallenge).then(() => {
      this.setState({ loading: false, redirect: true })
    })
  }

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/challenges'/>;
     }

    return (
      <div>
        <NavBar title='Post your challenge'/>
        <Paper style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50 }}>
        {
          this.state.loading &&
          <LinearProgress mode="indeterminate"/>
        }
        {/* <p style={{ fontFamily: 'Muli', fontSize: 25, fontWeight: '500'}}>Create a Challenge</p> */}
        <TextField
          style={{ marginTop: 10, width: '60%' }}
          hintText="Name"
          name="name"
          value={this.state.name}
          onChange={this.handleTextChange}
        /><br />
        <TextField
          style={{ marginTop: 10, width: '60%' }}
          hintText="Email"
          name="email"
          value={this.state.email}
          onChange={this.handleTextChange}
        /><br />
        <TextField
          style={{ marginTop: 10, width: '60%' }}
          hintText="Title"
          name="title"
          value={this.state.title}
          onChange={this.handleTextChange}
        /><br />
        <TextField
          style={{ marginTop: 10, width: '60%' }}
          hintText="Description"
          name="description"
          multiLine={true}
          rows={5}
          value={this.state.description}
          onChange={this.handleTextChange}
        /><br />
        <SelectField
          style={{ marginTop: 10, width: '60%' }}
          value={this.state.category}
          onChange={this.handleCategoryChange.bind(this)}
          floatingLabelText="Pick Category"
        >
          {items}
        </SelectField>
        <br />
        <RaisedButton
          backgroundColor='#38c098'
          labelColor='#fff'
          style={{ marginTop: 20 }}
          disabled={this.state.loading}
          label="Submit"
          onClick={this.handleOnSubmit.bind(this)}
        />
        </Paper>
      </div>
    )
  }
}

export default CreateChallengeForm
