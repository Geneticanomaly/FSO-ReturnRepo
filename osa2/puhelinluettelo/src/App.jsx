import {useState} from 'react';

const App = () => {
    const [persons, setPersons] = useState([{name: 'Arto Hellas'}]);
    const [newName, setNewName] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        setNewName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPerson = {
            name: newName,
        };
        setPersons(persons.concat(newPerson));
        setNewName('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    name: <input onChange={(e) => handleChange(e)} value={newName} />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person, i) => (
                <p key={i}>{person.name}</p>
            ))}
        </div>
    );
};

export default App;
