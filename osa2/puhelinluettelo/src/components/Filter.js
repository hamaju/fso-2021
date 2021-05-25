import React from 'react';

const Filter = ({ name, filter, handleFilterChange }) => {
  return (
    <div>
      {name} <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
