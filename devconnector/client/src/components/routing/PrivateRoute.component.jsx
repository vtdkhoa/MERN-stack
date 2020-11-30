import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
  const render = props => {
    if (!isAuthenticated && !loading) {
      return <Redirect to="/login" />
    } else {
      return <Component {...props} />
    }
  }

  return <Route {...rest} render={render} />
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(PrivateRoute)