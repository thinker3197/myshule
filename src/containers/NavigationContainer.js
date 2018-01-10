import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './HomeContainer'
import Challenges from './ChallengesContainer'
import CreateChallengeForm from './CreateChallengeForm'
import ChallengeDetails from './ChallengeDetailsContainer'
import OrganiseContainer from './OrganiseContainer'
import LocationBookingContainer from './LocationBookingContainer'
import LoginContainer from './LoginContainer';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class Navigator extends Component {
  state = {
    key: null
  }

  setRefKey = (key) => {
    this.setState({
      key: key
    });
  }

  removeRefKey = () => {
    this.setState({
      key: null
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <PropsRoute path='/post-challenge' component={CreateChallengeForm} challangeRefKey={this.state.key} removeChallengeRefKey={this.removeRefKey}/>
          <PropsRoute path='/challenges' component={Challenges} setChallengeRefKey={this.setRefKey} />
          <Route exact path="/challenge/:id" component={ChallengeDetails} />
          <Route exact path="/organise/:id" component={OrganiseContainer} />
          <Route exact path="/organise/:id/location" component={LocationBookingContainer} />
          <Route exact path="/login" component={LoginContainer} />
        </div>
      </Router>
    )
  }
}

export default Navigator
