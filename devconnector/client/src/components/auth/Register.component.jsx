import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordcfm: ''
  })
  const { name, email, password, passwordcfm } = formData

  const onChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const onSubmit = event => {
    event.preventDefault()
    if (password !== passwordcfm) {
      setAlert('Passwords does not match.', 'danger')
    } else {
      console.log(formData)
    }
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordcfm"
            minLength="6"
            value={passwordcfm}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      <p className="my-1">
        Already have an account?&nbsp;
        <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    setAlert: (message, alertType) => dispatch(setAlert(message, alertType))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Register)