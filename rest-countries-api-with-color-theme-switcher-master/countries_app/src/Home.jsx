import React, { useState, useEffect } from "react";
import {
  Await,
  defer,
  useLoaderData,
  Link,
  useSearchParams,
} from "react-router-dom";
import { getCountries, searchCountry } from "../api";

export function loader() {
  return defer({ countries: getCountries() });
}

export default function Home() {
  // fetch all countries
  const dataPromise = useLoaderData();

  // set region filter and search param
  let [searchParams, setSearchParams] = useSearchParams();
  const regionFilter = searchParams.get("region");

  // search box value and search results
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // tracking search box submitting state

  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleFilterChange(key, value) {
    setSearchParams((prev) => {
      if (!value) {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  }

  async function handleSearch(e) {
    e.preventDefault();

    if (searchValue) {
      setIsSubmitting(true);
      const data = await searchCountry(searchValue);
      setSearchResults(data);
      setIsSubmitting(false);
    } else {
      return;
    }
  }

  function displayElements(countries) {
    const countriesDisplay =
      searchResults.length > 0 ? searchResults : countries;
    const displayArr = regionFilter
      ? countriesDisplay.filter((c) => c.region === regionFilter)
      : countriesDisplay;

    return displayArr.map((country) => {
      return (
        <Link
          to={country.ccn3}
          key={country.name.common}
          state={{ filter: regionFilter }}
        >
          <section>
            <img src={country.flags.png} />
            <h1>{country.name.common}</h1>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </section>
        </Link>
      );
    });
  }

  return (
    <>
      {isSubmitting && <p>Loading...</p>}
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={dataPromise.countries}>
          {(countries) => {
            return (
              <>
                <form onSubmit={handleSearch}>
                  <input
                    placeholder="Search for a country..."
                    type="text"
                    name="name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <button type="submit">search</button>
                </form>
                <select
                  value={searchParams.get("region") || ""}
                  onChange={(e) => handleFilterChange("region", e.target.value)}
                >
                  <option value="" disabled hidden>
                    Filter by Region
                  </option>
                  <option value="">Clear Filter</option>

                  <option value="Africa">Africa</option>
                  <option value="Americas">America</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                </select>
                {displayElements(countries)}
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
}
