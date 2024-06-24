import {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
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

    useEffect(() => {
        const fetchPersonsData = () => {
            axios.get('http://localhost:3001/persons').then((res) => {
                setPersons(res.data);
            });
        };
        fetchPersonsData();
    }, []);

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
