import React from "react";
import { Await, defer, useLoaderData, Link } from "react-router-dom";
import { getCountries } from "../api";

export function loader() {
  return defer({ countries: getCountries() });
}

export default function Home() {
  const dataPromise = useLoaderData();

  return (
    <>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={dataPromise.countries}>
          {(countries) => {
            const displayElements = countries.map((country) => (
              <Link to={country.ccn3} key={country.name.common}>
                <section>
                  <img src={country.flags.png} />
                  <h1>{country.name.common}</h1>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>
                  <p>Capital: {country.capital}</p>
                </section>
              </Link>
            ));
            return <>{displayElements}</>;
          }}
        </Await>
      </React.Suspense>
    </>
  );
}
