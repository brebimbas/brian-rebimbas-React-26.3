const MAX_FILTER_LENGTH = 50;

function FilterInput({ filterTerm, onFilterChange }) {
  const handleChange = (event) => {
    const value = event.target.value;

    if (value.length <= MAX_FILTER_LENGTH) {
      onFilterChange(value);
    }
  };

  return (
    <div className="filter-control">
      <label htmlFor="filterInput">Search</label>

      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={handleChange}
        maxLength={MAX_FILTER_LENGTH}
        placeholder="Search todos..."
      />
    </div>
  );
}

export default FilterInput;
