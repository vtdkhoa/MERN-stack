import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Fragment>
      <div className="alert alert-danger">
        Invalid credentials
      </div>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            required
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

export default Login