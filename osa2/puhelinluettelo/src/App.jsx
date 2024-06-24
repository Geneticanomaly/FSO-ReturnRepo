import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

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
                id: (persons.length + 1).toString(),
            };

            personService.create(newPerson).then((returnedPerson) => {
                setPersons([...persons, returnedPerson]);
            });

            setNewName('');
            setNumber('');
        }
    };

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, [persons]);

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
