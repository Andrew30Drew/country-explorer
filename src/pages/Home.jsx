import React, { useState, useEffect } from "react";
import {
  getAllCountries,
  getCountriesByRegion,
  getCountryByName,
} from "../services/api";
import CountryCard from "../components/CountryCard";
import Search from "../components/Search";
import Filter from "../components/Filter";
import Skeleton from "../components/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-custom dark:shadow-custom-dark overflow-hidden animate-fade-in"
        >
          <Skeleton className="h-48 w-full" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-3/5" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

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
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
        <Search onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : countries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-600 dark:text-gray-400">
          <svg
            className="w-16 h-16 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
          <p className="text-xl font-semibold">No countries found</p>
          <p className="mt-2">Try adjusting your search or filter</p>
        </div>
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
