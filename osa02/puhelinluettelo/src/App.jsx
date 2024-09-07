import {useState, useEffect} from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState('');
    const [action, setAction] = useState('');

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

        let sameName = persons.find((person) => person.name === newName);

        if (sameName) {
            const newPerson = {...sameName, number: number};
            if (
                window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
            ) {
                personService
                    .update(newPerson)
                    .then((returnedPerson) => {
                        setPersons(persons.map((person) => (person.id === newPerson.id ? returnedPerson : person)));
                    })
                    .catch((error) => {
                        showMessage('validationError', newPerson, error.response.data.error);
                        console.error(error);
                    });
                showMessage('update', newPerson, '');
            }
            setNewName('');
            setNumber('');
        } else {
            const maxId = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
            const newPerson = {
                name: newName,
                number: number,
                id: (maxId + 1).toString(),
            };

            personService
                .create(newPerson)
                .then((returnedPerson) => {
                    setPersons([...persons, returnedPerson]);
                })
                .catch((error) => {
                    showMessage('validationError', newPerson, error.response.data.error);
                    console.error(error.response.data.error);
                });
            showMessage('add', newPerson, '');
            setNewName('');
            setNumber('');
        }
    };

    useEffect(() => {
        personService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    const showMessage = (action, person, message) => {
        if (action === 'add') {
            setMessage(`Added ${person.name}`);
            setAction('add');
        } else if (action === 'update') {
            setMessage(`Updated ${person.name}`);
            setAction('update');
        } else if (action === 'delete') {
            setMessage(`Deleted ${person.name}`);
            setAction('delete');
        } else if (action === 'validationError') {
            setMessage(message);
            setAction('delete');
        } else {
            setMessage(`Information of ${person.name} has already been removed from server`);
            setAction('delete');
        }
        setTimeout(() => {
            setMessage('');
            setAction('');
        }, 5000);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} action={action} />
            <Filter handleChange={handleChange} filter={filter} />
            <h2>Add a new</h2>
            <PersonForm handleSubmit={handleSubmit} handleChange={handleChange} newName={newName} number={number} />
            <h2>Numbers</h2>
            <Persons persons={persons} setPersons={setPersons} filter={filter} showMessage={showMessage} />
        </div>
    );
};

export default App;
