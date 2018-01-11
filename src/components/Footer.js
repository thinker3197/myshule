import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{ width: '100%'}}>
      <footer style={styles.footer}>
        <div className="container">
            <div className="row" style={{marginBottom: '60px'}}>
                <div className="col-sm-3">
                    <h5 style={styles.heading}>Get started</h5>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>Home</a></li>
                        <li><a href="#" style={styles.link}>Sign up</a></li>
                        <li><a href="#" style={styles.link}>Downloads</a></li>
                    </ul>
                </div>
                <div className="col-sm-3">
                    <h5 style={styles.heading}>About us</h5>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>Company Information</a></li>
                        <li><a href="#" style={styles.link}>Contact us</a></li>
                        <li><a href="#" style={styles.link}>Reviews</a></li>
                    </ul>
                </div>
                <div className="col-sm-3">
                    <h5 style={styles.heading}>Support</h5>
                    <ul style={styles.list}>
                        <li><a href="#" style={styles.link}>FAQ</a></li>
                        <li><a href="#" style={styles.link}>Help desk</a></li>
                        <li><a href="#" style={styles.link}>Forums</a></li>
                    </ul>
                </div>
                <div className="col-sm-3 info" style={styles.info}>
                    <h5 style={styles.heading}>Information</h5>
                    <p style={styles.infoText}> Lorem ipsum dolor amet, consectetur adipiscing elit. Etiam consectetur aliquet aliquet. Interdum et malesuada fames ac ante ipsum primis in faucibus. </p>
                </div>
            </div>
        </div>
      </footer>
    </div>
  )
}

const styles = {
  footer: {
    backgroundColor: '#3a3f46',
    color: 'white',
    flex: '0 0 auto',
    padding: '15px 0',
    fontFamily: 'Montserrat'
  },
  info: {
    textAlign: 'left', 
    color: '#afb0b1'
  },
  infoText: {
    fontFamily: 'Domine'
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    lineHeight: '1.7'
  }, 
  heading: {
    fontSize: '18px',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '30px'
  },
  link: {
    color: '#d2d1d1',
    textDecoration: 'none'
  },
  logo: {
    color: 'white',
    fontSize: '28px',
    float: 'left',
    fontWeight: 'bold',
    lineHeight: '68px',
    margin: '0',
    padding: '0'
  }
}

export default Footer
