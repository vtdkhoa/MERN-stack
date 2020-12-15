import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

const Education = ({ education }) => {
  const {
    school,
    degree,
    fieldOfStudy,
    description,
    from,
    to
  } = education

  return (
    <div>
      <h3 className="text-dark">{school}</h3>
      <p>{moment(from).format('L')} - {to ? moment(to).format('L') : 'Now'}</p>
      <p><strong>Degree: </strong>{degree}</p>
      <p><strong>Field of Study: </strong>{fieldOfStudy}</p>
      <p><strong>Description: </strong>{description}</p>
    </div>
  )
}

Education.propTypes = {
  education: PropTypes.object.isRequired
}

export default Education