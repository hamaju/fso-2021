import React, { useState, useEffect } from 'react';

import Input from './components/Input';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const notify = (message, type = 'primary') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const personExists = persons.some((person) => person.name === newName);

    if (personExists) {
      const person = persons.find((person) => person.name === newName);
      const { id } = person;
      const updatedPerson = { ...person, number: newNumber };

      const confirmPersonUpdate = window.confirm(
        `${newName} already exists, replace the old number with a new one?`
      );

      if (confirmPersonUpdate) {
        personService
          .update(id, updatedPerson)
          .then(() => {
            personService
              .getAll()
              .then((updatedPersons) => setPersons(updatedPersons));
          })
          .catch(() => {
            notify(
              `Information of ${person.name} has already been removed from the server`,
              'error'
            );
            setPersons(persons.filter((person) => person.id !== id));
          });

        setNewName('');
        setNewNumber('');
      }
    } else {
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        notify(`Added ${newPerson.name}`);
        setNewName('');
        setNewNumber('');
      });
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const handlePersonDelete = (id) => {
    const person = persons.find((person) => person.id === id);
    const confirmRemoval = window.confirm(`Delete ${person.name}?`);

    if (confirmRemoval) {
      personService.remove(id).then(() => {
        personService
          .getAll()
          .then((updatedPersons) => setPersons(updatedPersons));
      });

      notify(`Removed ${person.name}`);
      setFilter('');
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
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
      <Persons
        persons={persons}
        filter={filter}
        handlePersonDelete={handlePersonDelete}
      />
    </div>
  );
};

export default App;
