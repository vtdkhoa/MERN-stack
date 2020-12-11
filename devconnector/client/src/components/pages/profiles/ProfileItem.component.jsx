import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile }) => {
  const {
    user: { name, avatar },
    status,
    company,
    location,
    skills
  } = profile

  return (
    <Fragment>
      <div className="profile bg-light">
        <img
          className="round-img"
          src={avatar}
          alt="avatar"
        />
        <div>
          <h2>{name}</h2>
          <p>{status} {company && <span> at {company}</span>}</p>
          <p className="my-1">{location && <span>{location}</span>}</p>
          <Link to="/profile" className="btn btn-primary">
            View Profile
          </Link>
        </div>
        <ul>
          {
            skills.slice().map((skill, index) => (
              <li key={index} className="text-primary">
                <i className="fas fa-check"></i> {skill}
              </li>
            ))
          }
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem