import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../../actions/profile'
import PropTypes from 'prop-types'
import SelectItem from './form-items/SelectItem.component'
import InputItem from './form-items/InputItem.component'
import SocialItem from './form-items/SocialItem.component'

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  githubProfile: '',
  youtube: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  instagram: '',
  devto: ''
}

function ProfileForm({
  createProfile,
  getProfile,
  profile: { currentProfile, loading },
  history
}) {
  const [formData, setFormData] = useState(initialState)
  const [displaySocial, toggleSocial] = useState(false)

  useEffect(() => {
    if (!currentProfile) {
      getProfile()
    }

    if (!loading && currentProfile) {
      const profileData = {...initialState}
      for (const key in currentProfile) {
        if (key in profileData) {
          profileData[key] = currentProfile[key]
        }
      }

      for (const key in currentProfile.social) {
        if (key in profileData) {
          profileData[key] = currentProfile.social[key]
        }
      }

      if (Array.isArray(profileData.skills)) {
        profileData.skills = profileData.skills.join(', ')
      }
      setFormData(profileData)
    }
  }, [loading, getProfile, currentProfile])

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubProfile,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram,
    devto
  } = formData

  const onFormChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const onFormSubmit = event => {
    event.preventDefault()
    createProfile(formData, history, currentProfile ? true : false)
  }

  const options = [
    { value: '0', name: '* Select Professional Status' },
    { value: 'Junior Developer', name: 'Junior Developer' },
    { value: 'Senior Developer', name: 'Senior Developer' },
    { value: 'Manager', name: 'Manager' },
    { value: 'Student or Learning', name: 'Student or Learning' },
    { value: 'Instructor or Teacher', name: 'Instructor or Teacher' },
    { value: 'Intern', name: 'Intern' },
    { value: 'Other', name: 'Other' },
  ]

  return (
    <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i>&nbsp;
        Let's get some information to make your profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onFormSubmit}>
        <SelectItem
          value={status}
          options={options}
          onChange={onFormChange}
          text="Give us an idea of where you are at in your career"
        />
        <InputItem
          name="company"
          value={company}
          onChange={onFormChange}
          text="Could be your own company or one you work for"
        />
        <InputItem
          name="website"
          value={website}
          onChange={onFormChange}
          text="Could be your own or a company website"
        />
        <InputItem
          name="location"
          value={location}
          onChange={onFormChange}
          text="City & state suggested (eg. Boston, MA)"
        />
        <InputItem
          name="skills"
          value={skills}
          onChange={onFormChange}
          text="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
        />
        <InputItem
          name="githubProfile"
          placeholder="GitHub username"
          value={githubProfile}
          onChange={onFormChange}
          text="If you want your latest repos and a Github link, include your username"
        />
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={onFormChange}
          />
          <small className="form-text">
            Tell us a little about yourself
          </small>
        </div>
        <div className="my-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocial(!displaySocial)}
          >
            {!displaySocial ? 'Add' : 'Close'} Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {displaySocial && (
          <Fragment>
            <SocialItem value={twitter} name="twitter" onChange={onFormChange} />
            <SocialItem value={facebook} name="facebook" onChange={onFormChange} />
            <SocialItem value={youtube} name="youtube" onChange={onFormChange} />
            <SocialItem value={linkedin} name="linkedin" onChange={onFormChange} />
            <SocialItem value={instagram} name="instagram" onChange={onFormChange} />
            <SocialItem value={devto} name="devto" onChange={onFormChange} icon="dev" />
          </Fragment>
        )}
        <button type="submit" className="btn btn-primary my-1">Submit</button>
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </Fragment>
  )
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProfile: (formData, history, edit) => dispatch(
      createProfile(formData, history, edit)
    ),
    getProfile: () => dispatch(getCurrentProfile())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileForm))