// Filter.jsx
import React from "react";

const Filter = ({ onFilter }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="px-4 py-2 rounded shadow"
      defaultValue=""
    >
      <option value="">Filter by Region</option>
      {regions.map((region) => (
        <option key={region} value={region}>
          {region}
        </option>
      ))}
    </select>
  );
};

export default Filter;
