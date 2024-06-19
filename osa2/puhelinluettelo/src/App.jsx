import {useState} from 'react';

const App = () => {
    const [persons, setPersons] = useState([{name: 'Arto Hellas', number: '040-1231244'}]);
    const [newName, setNewName] = useState('');
    const [number, setNumber] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.name === 'name') {
            setNewName(e.target.value);
        } else {
            setNumber(e.target.value);
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
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    name: <input onChange={(e) => handleChange(e)} value={newName} name="name" />
                </div>
                <div>
                    number: <input onChange={(e) => handleChange(e)} value={number} name="number" />
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person, i) => (
                <p key={i}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
