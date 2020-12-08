import React from 'react'
import { capitilizeFirstLetter as capitialize } from '../../../../utils/capitialize'

const SocialItem = ({ name, value, onChange, icon }) => {
  return (
    <div className="form-group social-input">
      <i className={`fab fa-${icon || name} fa-2x`}></i>
      <input
        type="text"
        placeholder={`${capitialize(name)} URL`}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SocialItem