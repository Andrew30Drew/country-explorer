import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../services/api";

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
          setBorderCountries(borders.filter((c) => c).map((c) => c[0]));
        }
      }
      setLoading(false);
    };

    fetchCountry();
  }, [code]);

  if (loading)
    return <div className="text-center py-12">Loading country details...</div>;
  if (!country)
    return <div className="text-center py-12">Country not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-block mb-8 px-6 py-2 bg-white shadow rounded"
      >
        ← Back
      </Link>

      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="w-full max-h-96 object-contain"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <p>
                <span className="font-semibold">Native Name:</span>{" "}
                {Object.values(country.name.nativeName)[0]?.common || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Population:</span>{" "}
                {country.population.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Region:</span> {country.region}
              </p>
              <p>
                <span className="font-semibold">Sub Region:</span>{" "}
                {country.subregion || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Capital:</span>{" "}
                {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {country.tld?.[0] || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Currencies:</span>{" "}
                {Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {Object.values(country.languages).join(", ") || "N/A"}
              </p>
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Border Countries:</h3>
              <div className="flex flex-wrap gap-2">
                {borderCountries.map((border) => (
                  <Link
                    key={border.cca3}
                    to={`/country/${border.cca3}`}
                    className="px-4 py-1 bg-white shadow rounded"
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
