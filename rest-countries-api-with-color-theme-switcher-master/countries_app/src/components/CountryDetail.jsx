import { getCountry } from "../../api";
import { useLoaderData } from "react-router-dom";

export function loader({ params }) {
  return getCountry(params.ccn3);
}

const languagesAll = (languages) => {
  return Object.keys(languages).map((key) => {
    return languages[key];
  });
};

const currenciesAll = (currencies) => {
  return Object.keys(currencies).map((key) => {
    return currencies[key].name;
  });
};

const bordersAll = (country) => {
  if (!country.borders) {
    return <p>No borders country!</p>;
  }
  return country.borders.map((b) => {
    return <p key={b}>{b}</p>;
  });
};

const nativeName = (native) => {
  return Object.keys(native).map((key) => {
    return native[key].official;
  });
};
// cca3 for test: 170, 470
export default function CountryDetail() {
  const country = useLoaderData();
  return (
    <>
      <img src={country[0].flags.png} />
      <h1>{country[0].name.common}</h1>
      <p>Native Name: {nativeName(country[0].name.nativeName)}</p>
      <p>Population: {country[0].population}</p>
      <p>Region: {country[0].region}</p>
      <p>Sub Region: {country[0].subregion}</p>
      <p>Capital: {country[0].capital}</p>
      <p>Top Level Domain: {country[0].tld}</p>
      <p>Currencies: {currenciesAll(country[0].currencies)}</p>
      <p>
        Languages:
        {languagesAll(country[0].languages)}
      </p>

      <p>Border Countries:</p>
      {bordersAll(country[0])}
    </>
  );
}
