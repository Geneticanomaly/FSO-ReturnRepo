import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const BirthYearForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        born: '',
    });

    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bornToNumber = Number(formData.born);
        editAuthor({ variables: { name: formData.name, setBornTo: bornToNumber } });

        setFormData({
            name: '',
            born: '',
        });
    };

    return (
        <div>
            <h2>Set birthYear</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name <input type="text" name="name" onChange={handleChange} />
                </div>
                <div>
                    born <input type="number" name="born" onChange={handleChange} />
                </div>
                <button>update author</button>
            </form>
        </div>
    );
};

export default BirthYearForm;
