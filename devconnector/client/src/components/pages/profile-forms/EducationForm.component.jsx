import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import InputItem from './form-items/InputItem.component'

const EducationForm = () => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    current: false,
    to: '',
    description: ''
  })

  const onFormChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const onFormSubmit = event => {
    event.preventDefault()
  }

  const {
    school,
    degree,
    fieldOfStudy,
    from,
    current,
    to,
    description
  } = formData

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i>&nbsp;
        Add any school, bootcamp, etc that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onFormSubmit}>
        <InputItem
          placeholder="* School or Bootcamp"
          name="school"
          value={school}
          onChange={onFormChange}
        />
        <InputItem
          placeholder="* Degree or Certificate"
          name="degree"
          value={degree}
          onChange={onFormChange}
        />
        <InputItem
          placeholder="Field of Study"
          name="fieldOfStudy"
          value={fieldOfStudy}
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
            /> Current School or Bootcamp
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
            placeholder="Program Description"
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

export default EducationForm