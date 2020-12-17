import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUser, logout } from '../actions/auth'
import setAuthToken from '../utils/setAuthToken'
import PropTypes from 'prop-types'
import Navbar from './layouts/Navbar.component'
import Landing from './layouts/Landing.component'
import Register from './auth/Register.component'
import Login from './auth/Login.component'
import Alert from './layouts/Alert.component'
import Dashboard from './pages/dashboard/Dashboard.component'
import ProfileForm from './pages/profile-forms/ProfileForm.component'
import ExperienceForm from './pages/profile-forms/ExperienceForm.component'
import EducationForm from './pages/profile-forms/EducationForm.component'
import Profiles from './pages/profiles/Profiles.component'
import Profile from './pages/profile/Profile.component'
import PrivateRoute from './routing/PrivateRoute.component'
import './App.style.css'

const App = ({ loadUser, logout }) => {
  useEffect(() => {
    // Check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    loadUser()

    // Log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        logout()
      }
    })
  }, [loadUser])

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={ProfileForm} />
            <PrivateRoute path="/edit-profile" component={ProfileForm} />
            <PrivateRoute path="/add-experience" component={ExperienceForm} />
            <PrivateRoute path="/add-education" component={EducationForm} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser()),
    logout: () => dispatch(logout())
  }
}

App.propTypes = {
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(App)