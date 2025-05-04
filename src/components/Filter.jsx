// Filter.jsx
import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Filter = ({ value, onFilter }) => {
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onFilter(e.target.value)}
        className="appearance-none w-64 px-5 py-3.5 rounded-xl shadow-custom dark:shadow-custom-dark bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 cursor-pointer hover:shadow-custom-hover"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region} className="py-2">
            {region}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400">
        <FaChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Filter;
