import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './HomeContainer'
import Challenges from './ChallengesContainer'
import CreateChallengeForm from './CreateChallengeForm'
import ChallengeDetails from './ChallengeDetailsContainer'
import OrganiseContainer from './OrganiseContainer'
import LocationBookingContainer from './LocationBookingContainer'

const Navigator = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/challenges" component={Challenges}/>
      <Route exact path="/post-challenge" component={CreateChallengeForm} />
      <Route exact path="/challenge/:id" component={ChallengeDetails} />
      <Route exact path="/organise/:id" component={OrganiseContainer} />
      <Route exact path="/organise/:id/location" component={LocationBookingContainer} />
    </div>
  </Router>
)

export default Navigator
