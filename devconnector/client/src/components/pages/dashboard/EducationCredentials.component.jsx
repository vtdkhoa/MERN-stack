import React, { Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const EducationCredentials = ({ education }) => {
  const renderEducation = education.map(edu => (
    <tr key={edu._id}>
      <td className="hide-sm">{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">{edu.fieldOfStudy}</td>
      <td className="hide-sm">
        {moment(edu.from).format('L')} - {edu.to ? moment(edu.to).format('L') : 'Now'}
      </td>
      <td className="hide-sm">{edu.description}</td>
      <td className="hide-sm">
        <button className="btn btn-danger">
          <i className="fas fa-minus-circle"></i> Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Field of Study</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{renderEducation}</tbody>
      </table>
    </Fragment>
  )
}

EducationCredentials.propTypes = {
  education: PropTypes.array.isRequired
}

export default EducationCredentials