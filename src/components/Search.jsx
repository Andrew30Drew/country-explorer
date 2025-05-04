// Search.jsx
import React, { useState } from "react";

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
          className="w-full md:w-96 px-4 py-2 pl-10 rounded shadow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute left-3 top-2.5">
          🔍
        </button>
      </div>
    </form>
  );
};

export default Search;
