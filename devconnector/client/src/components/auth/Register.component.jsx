import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
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

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={event => onChange(event)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => onChange(event)}
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
            onChange={event => onChange(event)}
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
            onChange={event => onChange(event)}
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

export default Register