import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../../layouts/Spinner/Spinner.component'
import DashboardActions from './DashboardActions.component'
import ExperienceCredentials from './ExperienceCredentials.component'
import EducationCredentials from './EducationCredentials.component'

function Dashboard({ getProfile, auth: { user }, profile: { currentProfile, loading } }) {
  useEffect(() => {
    getProfile()
  }, [getProfile])

  if (loading && currentProfile === null) {
    return <Spinner />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome, {user && user.name}!
      </p>
      {
        currentProfile !== null ? (
          <Fragment>
            <DashboardActions />
            <ExperienceCredentials experience={currentProfile.experience} />
            <EducationCredentials education={currentProfile.education} />
            <div className="my-2">
              <button className="btn btn-danger">
                <i className="fas fa-minus-circle"></i> Delete my account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-primary my-1">
              Create Profile
            </Link>
          </Fragment>
        )
      }
    </Fragment>
  )
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProp = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(getCurrentProfile())
  }
}

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(Dashboard)