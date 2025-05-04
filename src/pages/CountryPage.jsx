import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../services/api";
import { FaArrowLeft } from "react-icons/fa";
import Skeleton from "../components/Skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <div className="inline-block mb-12">
        <Skeleton className="w-32 h-12 rounded-xl" />
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-1/2 animate-slide-up">
          <Skeleton className="w-full h-[400px] rounded-xl" />
        </div>
        
        <div className="w-full lg:w-1/2 animate-slide-up space-y-8">
          <Skeleton className="h-10 w-2/3" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-4/5" />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-4/5" />
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="flex flex-wrap gap-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CountryPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      const data = await getCountryByCode(code);
      if (data && data.length > 0) {
        setCountry(data[0]);
        // Fetch border countries if they exist
        if (data[0].borders) {
          const borders = await Promise.all(
            data[0].borders.map((border) => getCountryByCode(border))
          );
          setBorderCountries(
            borders.filter((c) => c && c.length > 0).map((c) => c[0])
          );
        }
      }
      setLoading(false);
    };

    fetchCountry();
  }, [code]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!country)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">
          Country not found
        </h2>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Go Back Home
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-6 py-12 animate-fade-in">
      <Link
        to="/"
        className="inline-flex items-center mb-12 px-8 py-3 bg-white dark:bg-gray-800 shadow-custom dark:shadow-custom-dark rounded-xl text-gray-700 dark:text-gray-300 hover:shadow-custom-hover transform hover:-translate-y-1 transition-all duration-200"
      >
        <FaArrowLeft className="mr-3" />
        Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="w-full lg:w-1/2 animate-slide-up">
          <div className="overflow-hidden rounded-xl shadow-custom dark:shadow-custom-dark">
            <img
              src={country.flags.png}
              alt={country.name.common}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div
          className="w-full lg:w-1/2 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            {country.name.common}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Native Name: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {Object.values(country.name.nativeName)[0]?.common || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Population: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.population.toLocaleString()}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Region: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.region}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Sub Region: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.subregion || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Capital: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.capital?.[0] || "N/A"}
                </span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Top Level Domain: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {country.tld?.[0] || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Currencies: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ") || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Languages: </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {Object.values(country.languages).join(", ") || "N/A"}
                </span>
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h3 className="font-semibold text-xl mb-4 text-gray-900 dark:text-white">
                Border Countries:
              </h3>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-6 py-2 bg-white dark:bg-gray-800 shadow-custom dark:shadow-custom-dark rounded-lg text-gray-700 dark:text-gray-300 hover:shadow-custom-hover transform hover:-translate-y-1 transition-all duration-200"
                  >
                    {border.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
