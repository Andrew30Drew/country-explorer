import React, { useState, useEffect } from "react";
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from "../services/api";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import Filter from "../components/Filter";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    setLoading(true);
    const data = await getAllCountries();
    setCountries(data);
    setLoading(false);
  };

  const handleSearch = async (name) => {
    if (!name.trim()) {
      fetchAllCountries();
      return;
    }
    setLoading(true);
    const data = await getCountryByName(name);
    setCountries(data || []);
    setLoading(false);
  };

  const handleFilter = async (region) => {
    if (!region) {
      fetchAllCountries();
      return;
    }
    setLoading(true);
    const data = await getCountriesByRegion(region);
    setCountries(data || []);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        <Search onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      {loading ? (
        <div className="text-center py-12">Loading countries...</div>
      ) : countries.length === 0 ? (
        <div className="text-center py-12">No countries found</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
