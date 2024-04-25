import React from "react";
import {
  Await,
  defer,
  useLoaderData,
  Link,
  useSearchParams,
} from "react-router-dom";
import { getCountries } from "../api";

export function loader() {
  return defer({ countries: getCountries() });
}

export default function Home() {
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

  const dataPromise = useLoaderData();
  let [searchParams, setSearchParams] = useSearchParams();

  const regionFilter = searchParams.get("region");

  function displayElements(countries) {
    const displayArr = regionFilter
      ? countries.filter((c) => c.region === regionFilter)
      : countries;

    return displayArr.map((country) => {
      return (
        <Link
          to={country.ccn3}
          key={country.name.common}
          state={{ ccn3: country.ccn3 }}
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
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={dataPromise.countries}>
          {(countries) => {
            return (
              <>
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
