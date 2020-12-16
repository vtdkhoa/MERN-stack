import React, { Fragment, useState } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import Modal from '../../layouts/Modal/Modal.component'

const EducationCredentials = ({ education }) => {
  const [show, setShow] = useState(false)

  if (education.length <= 0) {
    return (
      <Fragment>
        <h2 className="my-2">Education Credentials</h2>
        <h4 className="text-primary">
          You have no background education. Please add your background education,&nbsp;
          if you have been or still learning at somewhere.
        </h4>
      </Fragment>
    )
  }

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
        <button className="btn btn-danger" onClick={() => setShow(true)}>
          <i className="fas fa-minus-circle"></i> Delete
        </button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <Modal show={show} handleClose={() => setShow(false)}>
        <h4>Are you sure you want to delete your education information ?</h4>
      </Modal>
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