import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './layouts/Navbar.component'
import Landing from './layouts/Landing.component'
import Register from './auth/Register.component'
import Login from './auth/Login.component'
import './App.css'

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  )
}

export default App