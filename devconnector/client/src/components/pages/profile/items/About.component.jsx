import React from 'react'
import PropTypes from 'prop-types'

const About = ({ profile }) => {
  const { user: { name }, bio, skills } = profile

  return (
    <div className="profile-about bg-light p-2">
      <h2 className="text-primary">{name}'s Bio</h2>
      <p>{bio}</p>
      <div className="line"></div>
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {
          skills.slice().map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fa fa-check" /> {skill}
            </div>
          ))
        }
      </div>
    </div>
  )
}

About.propTypes = {
  profile: PropTypes.object.isRequired
}

export default About