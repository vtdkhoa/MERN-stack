import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Experience = ({ experience }) => {
  const {
    company,
    title,
    location,
    description,
    from,
    to
  } = experience

  return (
    <div>
      <h3 className="text-dark">{company}</h3>
      <p>{moment(from).format('L')} - {to ? moment(to).format('L'): 'Now'}</p>
      <p><strong>Position: </strong>{title}</p>
      <p><strong>Location: </strong>{location}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
  )
}

Experience.propTypes = {
  experience: PropTypes.object.isRequired
}

export default Experience