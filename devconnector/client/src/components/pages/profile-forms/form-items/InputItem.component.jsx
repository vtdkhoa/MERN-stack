import React from 'react'
import { capitilizeFirstLetter as capitilize } from '../../../../utils/capitialize'

const InputItem = ({ name, value, placeholder, onChange, text }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        placeholder={placeholder || capitilize(name)}
        name={name}
        vaue={value}
        onChange={onChange}
      />
      { text && <small className="form-text">{text}</small> }
    </div>
  )
}

export default InputItem