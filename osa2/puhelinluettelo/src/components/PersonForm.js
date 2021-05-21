import React from "react";

const PersonForm = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <button type="submit">add</button>
    </form>
  );
};

export default PersonForm;
