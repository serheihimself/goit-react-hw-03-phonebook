import React from 'react';
import PropTypes from 'prop-types';

function Filter({ value, onFilterChange }) {
  return (
    <input
      type="text"
      name="filter"
      value={value}
      onChange={onFilterChange}
      required
    />
  );
}

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
