import React from 'react'

const SocialLink = ({ link, name }) => {
  const className = name === 'globe'
    ? `fas fa-${name} fa-2x`
    : `fab fa-${name} fa-2x`

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <i className={className} />
    </a>
  )
}

export default SocialLink