import React, { Component } from 'react'
import * as firebase from 'firebase'
import { Link, Redirect } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { Grid, Row, Col } from 'react-bootstrap'
import JoinStakeholderDialog from '../components/JoinStakeholderDialog'
import bStyles from '../styles/ChallengesContainerStyles'

// this.props.match.params.id is the push key from firebase

const mentors = [
  {
    name: 'Sana Koskinen',
    expertise: 'Head of Game Jams'
  },
  {
    name: 'Jyri Kyllianen',
    expertise: 'Student Union Chairperson'
  },
  {
    name: 'Annika Jorvinen',
    expertise: 'School Principal'
  }
]

class ChallengeDetailsContainer extends Component {
  state = {
    challenge: {},
    show: null,
    openDialog: false,
    redirectTo: null,
    tab: 'organizers'
  }

  componentWillMount() {
    firebase.database().ref('/challenges/' + this.props.match.params.id).on('value', (snapshot) => {
      const challenge = snapshot.val()
      this.setState({ challenge })
    })
  }

  handleOnVote = (pushKey, votes) => {
    firebase.database().ref('/challenges/' + pushKey + '/votes').set(votes + 1)
  }

  handleClick = e => {
    console.log('clicked! ', e.target.id)
    this.setState({ target: e.target, show: e.target.id });
  }

  handleOpenDialog = () => {
    console.log('open dialog')
    this.setState({ openDialog: true })
  }

  getNumberOfRolesTaken = (roles) => {
    const takenRoles = roles.filter((role) => role.organiser)
    return takenRoles.length
  }

  areAllRolesTaken = (roles) => {
    const numberOfRoles = this.getNumberOfRolesTaken(roles)
    return !(numberOfRoles >= 7)
  }

  render() {
    const { challenge, redirectTo } = this.state
    const allRolesTaken = challenge.roles && this.areAllRolesTaken(Object.values(challenge.roles))
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return (
      <div>
        <NavBar />
        <JoinStakeholderDialog
          open={this.state.openDialog}
          handleClose={() => this.setState({ openDialog: false })}
          pushKey={this.props.match.params.id}
        />
        <Grid style={{ width: '99%'}}>
          <Row className="show-grid">
            <Col md={6} style={styles.titleContainer}>
              <strong><p style={styles.titleText}>{challenge.title}</p></strong>
            </Col>
            <Col md={6} style={{ backgroundColor: '#5e636d', width: '100%' }}>
                <div style={{ height: '80vh' }}>
                  <p style={styles.descriptionText}>{challenge.description}</p>
                  <div style={{ position: 'relative', bottom: 0, textAlign: 'center', marginTop: 40, marginLeft: 'auto', marginRight: 'auto'}}>
                    <button
                      style={bStyles.button}
                      onClick={() => this.setState({ redirectTo: '/organise/' + this.props.match.params.id })}
                      style={allRolesTaken ? bStyles.button : bStyles.dButton} disabled={!allRolesTaken}
                    >
                      Organise  {challenge.roles ? this.getNumberOfRolesTaken(Object.values(challenge.roles)) : 0} / 7
                    </button>
                    <button style={bStyles.button} onClick={() => this.handleOnVote(this.props.match.params.id, challenge.votes)}>
                      <i className="material-icons" style={{ fontSize: 16 }}>thumb_up</i> ( {challenge.votes} )
                    </button>
                    <button style={allRolesTaken ? bStyles.dButton : bStyles.button} disabled={allRolesTaken}>Participate</button>
                    <button style={bStyles.button}>Mentor</button>
                  </div>
                </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col md={4} style={{ backgroundColor: 'black', width: '100%' }}>
              <div>
                <p style={styles.bottomTitle}>STAKEHOLDERS</p>
                <p style={styles.bottomSubtitle}><i>People who could benefit from solutions to this challenge</i></p>

                {
                  challenge.stakeholders
                    ?
                      Object.values(challenge.stakeholders).map((stakeholder) => (
                        <div>
                          <p id={stakeholder.id} style={{ fontFamily: 'Muli', fontSize: 20,color: 'white', textAlign: 'center' }}>
                            <i id={stakeholder.id} style={{ fontSize: 40, color: 'white', paddingRight: 20 }} className="material-icons">account_circle</i>
                            {stakeholder.name}
                            {
                              stakeholder.facebook &&
                              <a href={stakeholder.facebook} target="_blank">
                                <img src='https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png' height="25" width="25" style={{ marginLeft: 20 }}/>
                              </a>
                            }
                          </p>
                          <p style={{ fontFamily: 'Muli', fontStyle: 'italic', fontSize: 17, color: 'white', textAlign: 'center'}}>{stakeholder.comments}</p>
                        </div>
                      ))

                    : <p style={{ fontFamily: 'Muli', fontSize: 20,color: 'white', textAlign: 'center' }}>None yet :( Join!</p>
                }
                <div style={{ width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                  <button onClick={() => this.handleOpenDialog()} style={styles.stakeholderButton}>Join as a stakeholder</button>
                </div>
              </div>
            </Col>
            <Col md={4} style={{ backgroundColor: '#5e636d', width: '100%' }}>
              <div>
                <p style={styles.bottomTitle}>SECTOR</p>
                <div style={{ width: 100, marginLeft:'auto', marginRight: 'auto'}} >
                  <i style={{ textAlign: 'center', fontSize: 100, color: 'rgb(156,208,202)' }} className="material-icons">lightbulb_outline</i>
                </div>
                <p style={{ fontSize: 30, fontFamily: 'Muli', letterSpacing: 5, textAlign: 'center', color: 'white'}}>{challenge.category && challenge.category.toUpperCase()}</p>
              </div>
            </Col>
            <Col md={4} style={{ backgroundColor: '#38c098', paddingTop: 40, minHeight: 600 }}>
              <div>
                <div style={styles.tellUsContainer}>
                  <span style={Object.assign({}, styles.tellUsTitle, this.state.tab === 'organizers' ? styles.tellUsSelected : {})} onClick={() => this.setState({tab: 'organizers'})}>ORGANIZERS</span>
                  <span style={Object.assign({}, styles.tellUsTitle, this.state.tab === 'mentors' ? styles.tellUsSelected : {})} onClick={() => this.setState({tab: 'mentors'})}>MENTORS</span>
                </div>
                <div style={styles.organizerContainer}>
                {
                  this.state.tab === 'organizers'
                    ? challenge.roles &&
                        Object.values(challenge.roles).map((role) => {
                          return (
                            <p key={role.id} style={styles.organizers}>
                              <span style={{ fontSize: 20 }}><strong>{role.title}</strong></span>  -
                              {
                                role.organiser
                                  ? '  ' + role.organiser.name + ' , ' + role.organiser.email
                                  : <i>   None yet, <Link to={'/organise/' + this.props.match.params.id}>organise!</Link></i>
                              }
                            </p>
                          )
                        })
                    : mentors.map((mentor, i) => (
                        <p key={i} style={styles.organizers}>
                          <span style={{ fontSize: 20 }}><strong>{mentor.name}</strong></span>  - {mentor.expertise}
                        </p>
                    ))
                }
              </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>

    )
  }
}

const styles = {
  titleContainer: {
    backgroundColor: '#91dcc1',
    width: '100%',
    paddingTop: 80,
    paddingRight: 50
  },
  titleText: {
    color: '#4987c6',
    fontWeight:'800',
    fontSize: 80,
    marginRight: 50,
    fontFamily: 'Helvetica',
    letterSpacing: 6,
    textAlign: 'right'
  },
  descriptionText: {
    color: 'white',
    fontStyle: 'italic',
    fontFamily: 'Muli',
    fontWeight: '300',
    width: '50%',
    textAlign: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: 180,
    lineHeight: 1.5,
    fontSize: 17
  },
  bottomTitle: {
    textAlign: 'center',
    fontSize: 30,
    letterSpacing: 3,
    fontWeight: '900',
    fontFamily: 'Muli',
    color: '#38c098'
  },
  bottomSubtitle: {
    fontFamily: 'Muli',
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
    color :'white',
    marginBottom: 30
  },
  tellUsTitle: {
    textAlign: 'center',
    fontSize: 30,
    letterSpacing: 3,
    fontWeight: '900',
    fontFamily: 'Muli',
    color: 'black',
    paddingLeft: 25,
    cursor: 'pointer'
  },
  tellUsSelected: {
    color: 'white'
  },
  tellUsContainer: {
    textAlign: 'center',
    width: '100%',
  },
  stakeholderButton: {
    fontSize: 18,
    backgroundColor: '#38c098',
    textDecoration: 'none',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 30,
    paddingTop: 20,
    paddingBottom: 20,
    color: 'white',
    fontFamily: 'Muli',
    border:'1px solid transparent',
    cursor: 'pointer',
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20
  },
  organizers: {
    fontFamily: 'Muli',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  organizerContainer: {
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 5
  }
}

export default ChallengeDetailsContainer
