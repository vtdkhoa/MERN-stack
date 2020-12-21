import React from 'react'

const SocialLink = ({ link, name }) => {
  let className

  if (name === 'globe') {
    className = 'fas fa-globe fa-2x'
  } else if (name === 'devto') {
    className = 'fab fa-dev fa-2x'
  } else {
    className = `fab fa-${name} fa-2x`
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <i className={className} />
    </a>
  )
}

export default SocialLink