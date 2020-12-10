import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Spinner from '../layouts/Spinner/Spinner.component'

function PrivateRoute({ component: Component, auth: { isAuthenticated, loading }, ...rest }) {
  const render = props => {
    if (loading) {
      return <Spinner />
    } else {
      if (isAuthenticated) {
        return <Component {...props} />
      } else {
        return <Redirect to="/login" />
      }
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