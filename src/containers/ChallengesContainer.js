import React, {Component} from 'react'
import * as firebase from 'firebase'
import NavBar from '../components/NavBar'
import styles from '../styles/ChallengesContainerStyles'
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Redirect } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class About extends Component {
  state = {
    challenges: {},
    redirectTo: null,
    rolesTaken: '',
    alertOpen: false,
    removeChallengeRefKey: null
  }

  MAX_WORDS = 200

  componentDidMount() {
    firebase.database().ref('/challenges').on('value', (snapshot) => {
      const challenges = snapshot.val();

      if (challenges) {
        this.setState({ challenges: challenges });
      }
    });
  }

 //handleOnVote = (pushKey, votes) => {
 // firebase.database().ref('/challenges/' + pushKey + '/votes').set(votes + 1)

  handleClose = () => {
    this.setState({
      alertOpen: false,
      removeChallengeRefKey: null
    });
  }

  handleOnOrganise = (pushKey) => {
    this.setState({ redirectTo: '/challenge/' +  pushKey})
  }

  getNumberOfRolesTaken = (roles) => {
    const takenRoles = roles.filter((role) => role.organiser)
    return takenRoles.length
  }

  areAllRolesTaken = (roles) => {
    const numberOfRoles = this.getNumberOfRolesTaken(roles)
    return !(numberOfRoles >= 7)
  }

  onRemoveChallenge = (e, key) => {
    this.setState({
      alertOpen: true,
      removeChallengeRefKey: key
    });
  }

  removeChallenge = (e, key) => {
    firebase.database().ref('/challenges/' + this.state.removeChallengeRefKey).remove();

    this.handleClose();
  }

  editChallenge = (e, key) => {
    this.props.setChallengeRefKey(key);

    this.setState({
      redirectTo: '/post-challenge'
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.removeChallenge}
      />,
    ];

    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo}  />
    }
    return (
      <div>
        <NavBar title='Challenges'/>
        <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
          <Grid style={{ marginTop: 30 }}>
            <Row className="show-grid">
              {
                Object.keys(this.state.challenges).map((key) => {
                  const challenge = this.state.challenges[key]
                  const allRolesTaken = this.areAllRolesTaken(Object.values(challenge.roles))
                  return (
                    <Col xs={6} style={{ marginTop: 20 }} key={key}>
                      <div style={{ margin: 5 }}>
                        <div onClick={() => this.setState({ redirectTo: '/challenge/' + key })}>
                          <p style={styles.challengeTitle}>{challenge.title}</p>
                        </div>
                        <p style={styles.description}>{challenge.description.slice(0, this.MAX_WORDS)}
                          <a href={'/challenge/' + key} style={{dislpay: challenge.description.length > this.MAX_WORDS ? 'inline' : 'none'}}> ...read more</a>
                        </p>
                        <div style={{ textAlign: 'center', marginTop: 40, marginLeft: 'auto', marginRight: 'auto'}}>
                          <button style={allRolesTaken ? styles.button : styles.dButton} onClick={() => this.handleOnOrganise(key)}disabled={!allRolesTaken}>
                            Organise {this.getNumberOfRolesTaken(Object.values(challenge.roles))} / 7
                          </button>
                          {
                            firebase.auth().currentUser ? (
                              <button style={styles.button} onClick={(e) => this.onRemoveChallenge(e, key)}>Remove</button>
                            ) : null
                          }
                          {
                            firebase.auth().currentUser ? (
                              <button style={styles.button} onClick={(e) => this.editChallenge(e, key)}>Edit</button>
                            ) : null
                          }
                        </div>
                      </div>
                    </Col>
                  )
                })
              }
            </Row>
          </Grid>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.alertOpen}
          onRequestClose={this.handleClose}
        >
          Are you sure you want to delete the challenge?
        </Dialog>
      </div>
    )
  }
}

export default About
