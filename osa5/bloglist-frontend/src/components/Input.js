import React from 'react'

const Input = ({ label, type, value, name, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <br></br>
        <input
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
