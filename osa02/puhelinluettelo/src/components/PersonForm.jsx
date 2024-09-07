const PersonForm = ({handleSubmit, handleChange, newName, number}) => {
    return (
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
    );
};

export default PersonForm;
