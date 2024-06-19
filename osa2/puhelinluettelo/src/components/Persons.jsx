const Persons = ({persons, filter}) => {
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            {filteredPersons.map((person, i) => (
                <p key={i}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default Persons;
