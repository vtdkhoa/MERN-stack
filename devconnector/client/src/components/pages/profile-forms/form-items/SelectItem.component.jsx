import React from 'react'

const SelectItem = ({ options, value, onChange, text }) => {
  return (
    <div className="form-group">
      <select name="status" value={value} onChange={onChange}>
        {
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))
        }
      </select>
      { text && <small className="form-text">{text}</small> }
    </div>
  )
}

export default SelectItem