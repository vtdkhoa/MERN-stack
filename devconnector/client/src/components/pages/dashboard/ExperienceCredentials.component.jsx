import React, { Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const ExperienceCredentials = ({ experience }) => {
  const renderExperience = experience.map(exp => (
    <tr key={exp._id}>
      <td className="hide-sm">{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        {moment(exp.from).format('L')} - {exp.to ? moment(exp.to).format('L') : 'Now'}
      </td>
      <td className="hide-sm">{exp.location}</td>
      <td className="hide-sm">{exp.description}</td>
      <td className="hide-sm">
        <button className="btn btn-danger">
          <i className="fas fa-minus-circle"></i> Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Job Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderExperience}</tbody>
      </table>
    </Fragment>
  )
}

ExperienceCredentials.propTypes = {
  experience: PropTypes.array.isRequired
}

export default ExperienceCredentials