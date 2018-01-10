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
        file: null 
    };

    componentWillMount() {
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

    handleFileSubmit = (event) => {
        const file = event.target.files[0],
            reader = new FileReader();

        reader.onload = () => {
            this.setState({
                file: reader.result
            });
        }

        if(file) {
            reader.readAsDataURL(file);
        }
    }

    handleOnUpdate() {
        const updatedChallenge = {
            creator: this.state.name,
            email: this.state.email,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            votes: 0,
            fileURL: this.state.file,
            roles: roles
        }

        firebase.database().ref().child('/challenges/' + this.props.challangeRefKey).update(updatedChallenge);

        this.props.removeChallengeRefKey();

        this.setState({
            editMode: false,
            redirect: true
        });
    }

    handleOnSubmit() {
        this.setState({loading: true})
        console.log('this is state', this.state)
        const newChallenge = {
            creator: this.state.name,
            email: this.state.email,
            title: this.state.title,
            description: this.state.description,
            category: this.state.category,
            votes: 0,
            fileURL: this.state.file,
            roles: roles
        }
        const pushKey = firebase.database().ref('/challenges').push()
        pushKey.set(newChallenge).then(() => {
            this.setState({loading: false, redirect: true})
        })
    }

    render() {
        const {redirect} = this.state;

        if (redirect) {
            return <Redirect to='/challenges'/>;
        }

        return <div>
            <NavBar title='Post your challenge'/>
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
                    label='My Label'>
                    <input style={{marginLeft: 12}} type="file" onChange={this.handleFileSubmit.bind(this)}/>
                </RaisedButton>
                <br/>
                <RaisedButton
                    backgroundColor='#38c098'
                    labelColor='#fff'
                    style={{marginTop: 20}}
                    disabled={this.state.loading}
                    label={this.state.editMode ? "Update" : "Submit"}
                    onClick={this.state.editMode ? this.handleOnUpdate.bind(this) : this.handleOnSubmit.bind(this)}
                />
            </Paper>
        </div>

    }
}

export default CreateChallengeForm