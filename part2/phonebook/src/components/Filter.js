import React from 'react'

const Filter = ({ label, filter, handleFilterChange }) => {
  return (
    <div>
      {label} <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  )
}

export default Filter
