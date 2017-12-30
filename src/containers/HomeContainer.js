import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { Grid, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class Home extends Component {
  state = {
    redirectTo: null
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={this.state.redirectTo} />
    }
    return (
      <div>
        <NavBar />
        <div style={styles.carouselDiv}>
          <div style={styles.centeredDiv}>
            <p style={styles.subheading}>Innovation Space for You</p>
            <p style={styles.mainHeading}>INNOV8</p>
          </div>
        </div>

        <div>
          <Grid style={styles.grid}>
            <Row>
              <Col md={6} style={styles.leftGrid}>
                <p style={styles.leftText}>Organise.</p>
                <p style={styles.leftText}>Mentor.</p>
                <p style={styles.leftText}>Solve.</p>
              </Col>
              <Col md={6} style={styles.rightGrid}>
                <p style={styles.rightTop}>WHAT?</p>
                <p style={styles.rightText}>Find a challenge</p>
                <p style={styles.rightText}>Organise a hackathon</p>
                <p style={styles.rightText}>Book a space</p>
                <p style={styles.rightText}>Mentor it!</p>
                <div style={styles.rightButtonContainer}>
                  <button style={styles.rightButton}>LEARN MORE</button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={4} style={{ width: '100%', paddingTop: 100, height: '65vh', backgroundColor: '#000' }}>
                <p style={styles.phaseTitle}>PHASE 1</p>
                <p style={styles.phaseSubTitle}>Create a Challenge</p>
                <div style={styles.phaseButtonContainer}>
                  <button onClick={() => this.setState({ redirectTo: '/post-challenge' })} style={Object.assign({}, styles.phaseButton, { color: '#000' })}>Create</button>
                </div>
              </Col>
              <Col md={4} style={{ width: '100%', paddingTop: 100, height: '65vh', backgroundColor: '#5e636a' }}>
                <p style={styles.phaseTitle}>PHASE 2</p>
                <p style={styles.phaseSubTitle}>Organize a Hackathon</p>
                <div style={styles.phaseButtonContainer}>
                  <button onClick={() => this.setState({ redirectTo: '/challenges' })} style={Object.assign({}, styles.phaseButton, { color: '#000' })}>Organize</button>
                </div>
              </Col>
              <Col md={4} style={{ width: '100%', paddingTop: 100, height: '65vh', backgroundColor: '#f9f907' }}>
                <p style={Object.assign({},styles.phaseTitle, { color: 'black'})}>PHASE 3</p>
                <p style={Object.assign({},styles.phaseSubTitle, { color: 'black'})}>Implement your Solution</p>
                <div style={styles.phaseButtonContainer}>
                  <button onClick={() => {}} style={Object.assign({}, styles.phaseButton, { backgroundColor: '#000'} )}>Implement</button>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }

}

const styles = {
  carouselDiv: {
    width: '100%',
    height: '70vh',
    backgroundColor: '#38c098',
    paddingTop: '20vh'
  },
  centeredDiv: {
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: 80,
    paddingBottom: 70,
    backgroundColor: 'white',
    textAlign: 'center',
    fontFamily: 'Muli',
  },
  mainHeading: {
    fontSize: 80,
    fontWeight: '500',
    color: '#43484f',
    margin: 0,
    marginTop: 20
  },
  subheading: {
    fontSize: 30,
    color: '#43484f',
    margin: 0
  },
  grid: {
    width: '98vw'
  },
  leftText: {
    fontSize: 80,
    fontFamily: 'Muli',
    color: 'black',
    margin: 0,
    fontWeight: '700',
    textAlign: 'right',
  },
  leftGrid: {
    height: 600,
    backgroundColor: '#f9f907',
    paddingTop: 100,
    paddingRight: 100,
    width: '100%',
  },
  rightGrid: {
    height: 600,
    backgroundColor: 'black',
    width: '100%',
  },
  rightTop: {
    color: 'white',
    fontSize: 60,
    letterSpacing: 10,
    fontWeight: '900',
    fontFamily: 'Muli',
    textAlign: 'center'
  },
  rightText: {
    color: 'white',
    fontFamily: 'Muli',
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10
  },
  rightButton: {
    textDecoration: 'none',
    border:'1px solid transparent',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 16,
    cursor: 'pointer'
  },
  rightButtonContainer: {
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 180
  },
  phaseTitle: {
    fontFamily: 'Muli',
    letterSpacing: 8,
    fontSize: 50,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center'
  },
  phaseSubTitle: {
    fontFamily: 'Muli',
    fontSize: 25,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center'
  },
  phaseButton: {
    fontSize: 18,
    backgroundColor: '#fff',
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
    marginBottom: 20,
    borderRadius: 30
  },
  phaseButtonContainer: {
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 60
  }
}

export default Home
