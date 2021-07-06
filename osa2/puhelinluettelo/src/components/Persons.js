import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handlePersonDelete }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            handlePersonDelete={handlePersonDelete}
          />
        ))}
    </ul>
  )
}

export default Persons
