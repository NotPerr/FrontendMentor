import React, { useState } from "react";
import {
  Await,
  defer,
  useLoaderData,
  Link,
  useSearchParams,
} from "react-router-dom";
import { getCountries, searchCountry } from "../api";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
  const [searchError, setSearchError] = useState(null);

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
      try {
        const data = await searchCountry(searchValue);
        setSearchResults(data);
        setIsSubmitting(false);
      } catch {
        setIsSubmitting(false);
        // search error
        setSearchError("no search result!");
      }
    } else {
      return;
    }
  }

  // display all country preview cards
  function displayElements(countries) {
    if (searchError) {
      return searchError;
    }
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
          className="my-6 block mx-auto w-4/5"
        >
          <section className="dark:bg-darkCardBg  rounded-md">
            <img src={country.flags.png} className="rounded-t-md" />
            <div className="px-3 py-5 mb-5">
              <h1 className="mb-5">{country.name.common}</h1>
              <p>Population: {country.population}</p>
              <p>Region: {country.region}</p>
              <p className="mb-3">Capital: {country.capital}</p>
            </div>
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
                <form
                  onSubmit={handleSearch}
                  className="block my-6 w-full dark:bg-darkCardBg px-4 py-4"
                >
                  <button type="submit" className="mr-3">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </button>
                  <input
                    placeholder="Search for a country..."
                    type="text"
                    name="name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="dark:bg-darkCardBg dark:text-darkText "
                  />
                </form>
                <select
                  value={searchParams.get("region") || ""}
                  onChange={(e) => handleFilterChange("region", e.target.value)}
                  className="dark:bg-darkCardBg dark:text-darkText py-3 px-2.5 font-light w-1/2"
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
                <div className="place-items-center">
                  {displayElements(countries)}
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
}
