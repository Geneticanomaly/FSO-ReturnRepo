import {useState} from 'react';

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

    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>

            <div>
                filter shown with: <input onChange={(e) => handleChange(e)} value={filter} name="filter" />
            </div>

            <h2>Add a new</h2>
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
            {filteredPersons.map((person, i) => (
                <p key={i}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
