import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const onChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const onSubmit = event => {
    event.preventDefault()
    login(email, password)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="my-1">
        Don't have an account?&nbsp;
        <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

export default connect(
  null,
  mapDispatchToProps
)(Login)