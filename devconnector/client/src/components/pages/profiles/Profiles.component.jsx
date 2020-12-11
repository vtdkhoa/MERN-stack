import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProfiles } from '../../../actions/profile'
import PropTypes from 'prop-types'
import Spinner from '../../layouts/Spinner/Spinner.component'
import ProfileItem from './ProfileItem.component'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  if (loading) {
    return <Spinner />
  }

  const renderProfiles = profiles.map(profile => (
    <ProfileItem key={profile._id} profile={profile}/>
  ))

  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i>&nbsp;
        Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles.length > 0 ? renderProfiles : <h4>No profiles found.</h4>}
      </div>
    </Fragment>
  )
}

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProfiles: () => dispatch(getProfiles())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profiles)