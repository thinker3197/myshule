import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ title }) => {
  return (
    <div style={{ width: '100%'}}>
      <div style={styles.titleContainer}>
        <img src={require('../assets/logo.JPG')} height="80px"/>
      </div>
      <div style={styles.linksContainer}>
        <Link to='/' style={styles.link}>Home</Link>
        <Link to='/challenges' style={styles.link}>Challenges</Link>
        <Link to='/post-challenge' style={styles.link}>Post Your Challenge</Link>
        <Link to='#' style={styles.link}>Archives</Link>
        {
          title &&
          <div>
            <p style={styles.pageTitle}>{title}</p>
          </div>
        }
      </div>
    </div>
  )
}

const styles = {
  titleContainer: {
    textAlign: 'left'
  },
  title: {
    fontSize: 30,
    fontFamily: 'Muli',
    fontWeight: '800',
    color: '#42484f'
  },
  pageTitle: {
    color: 'white',
    fontSize: 55,
    fontFamily: 'Muli',
    paddingTop: 30,
    paddingBottom: 30
  },
  linksContainer: {
    backgroundColor: '#42484f',
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center'
  },
  link: {
    color: 'white',
    paddingLeft: 50,
    textAlign: 'center',
    fontFamily: 'Muli',
    textDecoration: 'none',
    fontSize: 18
  }
}

export default NavBar
