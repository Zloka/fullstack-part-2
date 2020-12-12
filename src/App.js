import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personService from './network/personService';

const App = () => {
  const [ persons, setPersons ] = useState([]); 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService.getAll().then(retrievedPersons => setPersons(retrievedPersons)).catch(error => console.log(error));
  }, []);

  const handleAddPerson = (event) => {
    event.preventDefault();
    const possiblyExistingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    const personObject = { name: newName, number: newNumber }
    if (possiblyExistingPerson && window.confirm(`${possiblyExistingPerson.name} already exists in the phonebook, would you like to update their number?`)) {
      personService.update(possiblyExistingPerson.id, personObject).then(updatedPerson => {
        setPersons(persons.map(person => person.id === possiblyExistingPerson.id ? updatedPerson : person));
        setNewName('');
        setNewNumber('');
      }).catch(error => console.log(error));
    } else if (persons.some(person => person.number === newNumber)) {
      window.alert(`The number ${newNumber} is already in the phonebook!`);
    } else if (!possiblyExistingPerson) {
      personService.create(personObject)
        .then((createdPerson) => {
          setPersons(persons.concat(createdPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.log(error));
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleRemovePerson = (id) => {
    const personToRemove = persons.find(person => person.id === id);
    if (personToRemove && window.confirm(`Would you really like to remove ${personToRemove.name} from the phonebook?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => console.log(error));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleAddPerson} onNameChange={handleNameChange} onNumberChange={handleNumberChange} name={newName} number={newNumber} />
      <h2>Numbers</h2>
      <Persons onDeleteClick={handleRemovePerson} filter={filter} persons={persons} />
    </div>
  )
}

export default App