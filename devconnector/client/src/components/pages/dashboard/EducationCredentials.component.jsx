import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { deleteEducation } from '../../../actions/profile'
import moment from 'moment'
import PropTypes from 'prop-types'
import Modal from '../../layouts/Modal/Modal.component'

const EducationCredentials = ({ education, deleteEducation }) => {
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

  const handleDeleteEducation = id => {
    deleteEducation(id)
    setShow(false)
  }

  const renderEducation = education.map(edu => (
    <Fragment key={edu._id}>
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        handleDelete={() => handleDeleteEducation(edu._id)}
      >
        <h4>Are you sure you want to delete your education information ?</h4>
      </Modal>
      <tr>
        <td className="hide-sm">{edu.school}</td>
        <td className="hide-sm">{edu.degree}</td>
        <td className="hide-sm">{edu.fieldOfStudy}</td>
        <td className="hide-sm">
          {moment(edu.from).format('LL')} - {edu.to ? moment(edu.to).format('LL') : 'Now'}
        </td>
        <td className="hide-sm">{edu.description}</td>
        <td className="hide-sm">
          <button className="btn btn-danger" onClick={() => setShow(true)}>
            <i className="fas fa-minus-circle"></i> Delete
          </button>
        </td>
      </tr>
    </Fragment>
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
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEducation: id => dispatch(deleteEducation(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(EducationCredentials)