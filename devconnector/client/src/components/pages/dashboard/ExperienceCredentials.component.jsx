import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { deleteExperience } from '../../../actions/profile'
import moment from 'moment'
import PropTypes from 'prop-types'
import Modal from '../../layouts/Modal/Modal.component'

const ExperienceCredentials = ({ experience, deleteExperience }) => {
  const [show, setShow] = useState(false)

  if (experience.length <= 0) {
    return (
      <Fragment>
        <h2 className="my-2">Experience Credentials</h2>
        <h4 className="text-primary">
          You have no experience. Please add your experiences, if you have been or still working at somewhere.
        </h4>
      </Fragment>
    )
  }

  const handleDeleteExperience = id => {
    deleteExperience(id)
    setShow(false)
  }

  const renderExperience = experience.map(exp => (
    <Fragment key={exp._id}>
      <Modal
        show={show}
        handleClose={() => setShow(false)}
        handleDelete={() => handleDeleteExperience(exp._id)}
      >
        <h4>Are you sure you want to delete your experience information ?</h4>
      </Modal>
      <tr>
        <td className="hide-sm">{exp.company}</td>
        <td className="hide-sm">{exp.title}</td>
        <td className="hide-sm">
          {moment(exp.from).format('L')} - {exp.to ? moment(exp.to).format('L') : 'Now'}
        </td>
        <td className="hide-sm">{exp.location}</td>
        <td className="hide-sm">{exp.description}</td>
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
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    deleteExperience: id => dispatch(deleteExperience(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ExperienceCredentials)