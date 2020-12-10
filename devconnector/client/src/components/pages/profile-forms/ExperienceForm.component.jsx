import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { addExperience } from '../../../actions/profile'
import PropTypes from 'prop-types'
import InputItem from './form-items/InputItem.component'

const ExperienceForm = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })

  const onFormChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const onFormSubmit = event => {
    event.preventDefault()
    addExperience(formData, history)
  }

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i>&nbsp;
        Add any developer/programming positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onFormSubmit}>
        <InputItem
          placeholder="* Job Title"
          name="title"
          value={title}
          onChange={onFormChange}
        />
        <InputItem
          placeholder="* Company"
          name="company"
          value={company}
          onChange={onFormChange}
        />
        <InputItem
          name="location"
          value={location}
          onChange={onFormChange}
        />
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={onFormChange}
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={() => setFormData({ ...formData, current: !current })}
            /> Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            disabled={current}
            onChange={onFormChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={onFormChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-1">
          Submit
        </button>
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

ExperienceForm.propTypes = {
  addExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    addExperience: (formData, history) => dispatch(
      addExperience(formData, history)
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(ExperienceForm))