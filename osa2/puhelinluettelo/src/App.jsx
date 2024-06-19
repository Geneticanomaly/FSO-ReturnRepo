import {useState} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'},
    ]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');
    const [filter, setFilter] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'name') {
            setNewName(e.target.value);
        } else if (e.target.name === 'number') {
            setNumber(e.target.value);
        } else {
            setFilter(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let sameName = persons.filter((person) => person.name === newName);

        if (sameName.length > 0) {
            alert(`${newName} is already added to the phonebook`);
            setNewName('');
            setNumber('');
        } else {
            const newPerson = {
                name: newName,
                number: number,
            };
            setPersons([...persons, newPerson]);
            setNewName('');
            setNumber('');
        }
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleChange={handleChange} filter={filter} />
            <h2>Add a new</h2>
            <PersonForm handleSubmit={handleSubmit} handleChange={handleChange} newName={newName} number={number} />
            <h2>Numbers</h2>
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;
