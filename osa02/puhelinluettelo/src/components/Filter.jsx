const Filter = ({handleChange, filter}) => {
    return (
        <div>
            filter shown with: <input onChange={(e) => handleChange(e)} value={filter} name="filter" />
        </div>
    );
};

export default Filter;
