import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country }) => {
  return (
    <Link
      to={`/country/${country.cca3}`}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-custom dark:shadow-custom-dark hover:shadow-custom-hover transform hover:-translate-y-2 transition-all duration-300 animate-fade-in overflow-hidden group"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
          {country.name.common}
        </h2>
        <div className="space-y-2.5">
          <p className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
            <span className="font-semibold">Population:</span>
            <span className="text-gray-600 dark:text-gray-400">
              {country.population.toLocaleString()}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
            <span className="font-semibold">Region:</span>
            <span className="text-gray-600 dark:text-gray-400">
              {country.region}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 flex items-center justify-between">
            <span className="font-semibold">Capital:</span>
            <span className="text-gray-600 dark:text-gray-400">
              {country.capital?.[0] || "N/A"}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
