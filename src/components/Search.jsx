// Search.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6" role="form">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a country..."
          className="w-full md:w-96 px-5 py-3.5 pl-12 rounded-xl shadow-custom dark:shadow-custom-dark bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <FaSearch className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default Search;
