function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className="filter-control">
      <label htmlFor="filterInput">Search</label>

      <input
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search todos..."
      />
    </div>
  );
}

export default FilterInput;
