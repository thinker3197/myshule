import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Redirect } from 'react-router-dom'

import NavBar from '../components/NavBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';

const items = [
  <MenuItem key={1} value={'Compuatational'} primaryText="CT" />,
  <MenuItem key={2} value={'Robotics'} primaryText="Robitcs" />,
  <MenuItem key={3} value={'games'} primaryText="Scratch" />,
  <MenuItem key={4} value={'alice'} primaryText="Alice" />,
  <MenuItem key={4} value={'Mindstrom'} primaryText="Lego" />,
];

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
};

class CreateChallengeForm extends Component {
    state = {
        editMode: false,
        redirect: false,
        loading: false,
        name: 'Zuena Mgova Kowanga',
        email: 'zuena.juma@shouldersofgiants.fi',
        title: 'CT',
        description: 'Compuatational thinking  has been defended by several authors as a thought process of solving problems compuatationally.' +
        'Many countries partcilaur in Europe and USA have been decrared integrating compuational thking in compusolry education.',
        category: 'Computational thinking',
        file: null,
        user: null
    };

    // If challenge ref key was passed as props,
    // fetch the challenge and pre fill form data.
    // Set form in edit mode. 
    componentWillMount() {
        const user = firebase.auth().currentUser;

        this.setState({
            user: user
        });

        if(this.props.challangeRefKey) {
            firebase.database().ref('/challenges/' + this.props.challangeRefKey).on('value', (snapshot) => {
                const data = snapshot.val();

                this.setState({
                    name: data.creator,
                    email: data.email,
                    title: data.title,
                    description: data.description,
                    category: data.category,
                });
            });

            this.setState({
                editMode: true
            });
        } else {
            this.setState({
                editMode: false
            });
        }
    }
    
    // Remove challenge ref key and exit edit mode 
    // when user goes to another route ie when 
    // compoenent unmounts 
    componentWillUnmount() {
        this.props.removeChallengeRefKey();

        this.setState({
            editMode: false
        });
    }

    handleCategoryChange = (event, index, value) => this.setState({category: value})

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

    // On file submit, convert file into data URL
    // for saving file in database
    handleFileSubmit = (event) => {
        const file = event.target.files[0];
        
        this.setState({
            file: file
        });
    }

    uploadFile = (fileName) => {
        firebase.storage().ref().child('/challenges/' + fileName).put(this.state.file)
        .then((snapshot) => {
            console.log('File successfully downloaded!');
        });
    } 

    // Update challenge details (in edit mode)
    handleOnUpdate() {
        const fileName = this.state.file ? (+new Date()) + '-' + this.state.file.name : null;
        const updatedChallenge = {
            creator: this.state.name,
            email: this.state.email,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            votes: 0,
            file: fileName,
            roles: roles
        }

        firebase.database().ref().child('/challenges/' + this.props.challangeRefKey).update(updatedChallenge);

        if(this.state.file) {
            this.uploadFile(updatedChallenge.file);
        }

        this.props.removeChallengeRefKey();

        this.setState({
            editMode: false,
            redirect: true,
            loading: false
        });
    }

    handleOnSubmit() {
        this.setState({loading: true});

        const fileName = this.state.file ? (+new Date()) + '-' + this.state.file.name : null;
        const newChallenge = {
            creator: this.state.name,
            email: this.state.email,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            votes: 0,
            file: fileName,
            roles: roles
        }
        const pushKey = firebase.database().ref('/challenges').push()
        pushKey.set(newChallenge).then(() => {
            this.setState({loading: false, redirect: true})
        })

        if(this.state.file) {
            this.uploadFile(newChallenge.file);
        }
    }

    onDialogClose = () => {
        window.location.href = '/login';
    }

    render() {
        const {redirect} = this.state;
        const actions = [
            <FlatButton
              label="Close"
              primary={true}
              onClick={this.onDialogClose}
            />,
          ];

        if (redirect) {
            return <Redirect to='/challenges'/>;
        }

        if(this.state.user) {
            return <div style={{minHeight: '100vh', position: 'relative', 'paddingBottom': '8%'}}>
                <NavBar title={this.state.editMode ? 'Edit challenge' : 'Post your challenge'}/>
                <Paper style={{width: '50%', marginLeft: 'auto', marginRight: 'auto', padding: 20, marginTop: 50}}>
                    {
                        this.state.loading &&
                        <LinearProgress mode="indeterminate"/>
                    }
                    {/* <p style={{ fontFamily: 'Muli', fontSize: 25, fontWeight: '500'}}>Create a Challenge</p> */}
                    <TextField
                        style={{marginTop: 10, width: '60%'}}
                        hintText="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleTextChange}
                    /><br/>
                    <TextField
                        style={{marginTop: 10, width: '60%'}}
                        hintText="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleTextChange}
                    /><br/>
                    <TextField
                        style={{marginTop: 10, width: '60%'}}
                        hintText="Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleTextChange}
                    /><TextField
                    style={{marginTop: 10, width: '60%'}}
                    hintText="Description"
                    name="description"
                    multiLine={true}
                    rows={5}
                    value={this.state.description}
                    onChange={this.handleTextChange}
                />
                    <br />
                    <br/>
                    <SelectField
                        style={{marginTop: 10, width: '60%'}}
                        value={this.state.category}
                        onChange={this.handleCategoryChange.bind(this)}
                        floatingLabelText="Pick Category"
                    >
                        {items}
                    </SelectField>
                    <br/>
                    <RaisedButton
                        style={{marginTop: 10, padding: 5}}
                        containerElement='label'
                        label='Upload File'>
                        <input style={{marginLeft: 12}} type="file" onChange={this.handleFileSubmit.bind(this)}/>
                    </RaisedButton>
                    <br/>
                    <RaisedButton
                        backgroundColor='#38c098'
                        labelColor='#fff'
                        style={{marginTop: 20}}
                        buttonStyle={{background: 'linear-gradient(45deg, #00ead1 30%, #01ffb3 90%)'}}
                        disabled={this.state.loading}
                        label={this.state.editMode ? "Update" : "Submit"}
                        onClick={this.state.editMode ? this.handleOnUpdate.bind(this) : this.handleOnSubmit.bind(this)}
                    />
                </Paper>
            </div>
        } else {
            return <Dialog
                title="Cannot post challenge"
                actions={actions}
                modal={true}
                open={!this.state.user}
            >
                You need to Login before you could post a challenge
            </Dialog>
        }

    }
}

export default CreateChallengeForm