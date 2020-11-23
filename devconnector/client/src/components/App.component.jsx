import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadUser } from '../actions/auth'
import setAuthToken from '../utils/setAuthToken'
import Navbar from './layouts/Navbar.component'
import Landing from './layouts/Landing.component'
import Register from './auth/Register.component'
import Login from './auth/Login.component'
import Alert from './layouts/Alert.component'
import './App.css'

const App = ({ loadUser }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    loadUser()
  }, [])

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
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)