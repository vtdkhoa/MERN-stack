import React, { Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const ExperienceCredentials = ({ experience }) => {
  const renderExperience = experience.map(exp => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {moment(exp.from).format('L')} - {exp.to ? moment(exp.to).format('L') : 'Now'}
      </td>
      <td><button className="btn btn-danger">Delete</button></td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 class="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
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