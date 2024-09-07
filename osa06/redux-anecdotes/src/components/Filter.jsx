import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(filterChange(e.target.value));
    };

    return (
        <div style={{ marginBottom: 10 }}>
            filter <input type="text" name="filter" onChange={handleChange} />
        </div>
    );
};

export default Filter;
