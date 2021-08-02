import React from 'react'

const Input = ({ label, type, value, name, onChange }) => {
  return (
    <div className="field">
      <label className="label">
        {label}
        <br />
        <input
          className="input"
          type={type}
          value={value}
          name={name}
          id={label}
          onChange={onChange}
        />
      </label>
    </div>
  )
}

export default Input
