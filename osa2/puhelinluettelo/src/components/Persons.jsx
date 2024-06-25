import personService from '../services/persons';

const Persons = ({persons, setPersons, filter, showMessage}) => {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

    const deletePerson = (id) => {
        const personToDelete = persons.find((person) => person.id === id);
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personService
                .deletePerson(id)
                .then(() => {
                    setPersons(persons.filter((person) => person.id !== id));
                    showMessage('delete', personToDelete);
                })
                .catch((error) => {
                    showMessage('error', personToDelete);
                    console.error(error);
                });
        }
    };

    return (
        <div>
            {filteredPersons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                </p>
            ))}
        </div>
    );
};

export default Persons;
