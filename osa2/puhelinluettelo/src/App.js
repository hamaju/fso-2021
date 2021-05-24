import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const checkIfPersonExists = persons.some(
      (person) => person.name === newName
    );

    if (!checkIfPersonExists) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    } else {
      window.alert(`${newName} is already added `);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter
        name="filter shown with"
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add new</h2>
      <Input name="name" value={newName} onChange={handleNameChange} />
      <Input name="number" value={newNumber} onChange={handleNumberChange} />
      <PersonForm onSubmit={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
