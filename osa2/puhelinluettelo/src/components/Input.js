import React from "react";

const Input = ({ name, value, onChange }) => {
  return (
    <div>
      {name} <input value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
