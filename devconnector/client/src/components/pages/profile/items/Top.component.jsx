import React from 'react'
import PropTypes from 'prop-types'
import SocialLink from './SocialLink.component'

const Top = ({ profile }) => {
  const {
    user: { name, avatar },
    location,
    status,
    company,
    website,
    social
  } = profile

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="avatar" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {status} {company && <span>at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && <SocialLink link={website} name="globe" />}
        {social && social.twitter && <SocialLink link={social.twitter} name="twitter" />}
        {social && social.facebook && <SocialLink link={social.facebook} name="facebook" />}
        {social && social.linkedin && <SocialLink link={social.linkedin} name="linkedin" />}
        {social && social.youtube && <SocialLink link={social.youtube} name="youtube" />}
        {social && social.instagram && <SocialLink link={social.instagram} name="instagram" />}
        {social && social.devto && <SocialLink link={social.devto} name="dev" />}
      </div>
    </div>
  )
}

Top.propTypes = {
  profile: PropTypes.object.isRequired
}

export default Top