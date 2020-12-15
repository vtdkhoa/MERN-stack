import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfileById } from '../../../actions/profile'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../../layouts/Spinner/Spinner.component'
import Top from './items/Top.component'
import About from './items/About.component'
import Experience from './items/Experience.component'

function Profile ({
  getProfileById,
  profile: { currentProfile },
  auth: { isAuthenticated, loading, user },
  match
}) {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      {currentProfile === null ? <Spinner /> : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {
            isAuthenticated && loading === false && user._id === currentProfile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )
          }
          <div className="profile-grid my-1">
            <Top profile={currentProfile} />
            <About profile={currentProfile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {currentProfile.experience.length > 0
                ? (
                  <Fragment>
                    {currentProfile.experience.map(exp => (
                      <Experience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : <h4>No Experience Credentials</h4>
              }
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {/* ProfileEducation */}
            </div>
            {/* ProfileGitHub */}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfileById: userId => dispatch(getProfileById(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)