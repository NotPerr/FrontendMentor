import { getCountry } from "../../api";
import {
  useLoaderData,
  useLocation,
  Link,
  Await,
  defer,
} from "react-router-dom";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function loader({ params }) {
  return defer({ country: getCountry(params.ccn3) });
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
    return (
      <div key={b} className="basis-1/3  pr-1 mb-1">
        <div className="dark:bg-darkCardBg text-center shadow-md">
          <p className="font-thin">{b}</p>
        </div>
      </div>
    );
  });
};

const nativeName = (native) => {
  return Object.keys(native).map((key) => {
    return native[key].official;
  });
};

export default function CountryDetail() {
  const dataPromise = useLoaderData();
  const location = useLocation();

  const filter = location.state?.filter ? `${location.state.filter}` : "";
  return (
    <>
      <React.Suspense fallback={<p>Loading...</p>}>
        <Await resolve={dataPromise.country}>
          {(country) => {
            return (
              <div className="min-h-full">
                <Link
                  to={`..?region=${filter}`}
                  relative="path"
                  className="block  dark:bg-darkCardBg w-2/5 my-9 py-1 shadow-md rounded-md pc:w-1/5"
                >
                  <div className="flex items-center justify-center">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
                    Back
                  </div>
                </Link>
                <div
                  className="flex flex-col items-center justify-center 
                tablet:mx-auto  pc:flex-row  pc:justify-between pc:w-5/6 pc:mx-auto"
                >
                  <img
                    src={country[0].flags.png}
                    className="w-full mb-9 pc:w-4/5"
                  />
                  <div className="w-full pc:pl-9">
                    <h1 className="my-3">{country[0].name.common}</h1>
                    <p className="font-semibold">
                      Native Name:{" "}
                      <span className="font-thin">
                        {nativeName(country[0].name.nativeName)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Population:{" "}
                      <span className="font-thin">{country[0].population}</span>
                    </p>
                    <p className="font-semibold">
                      Region:{" "}
                      <span className="font-thin">{country[0].region}</span>
                    </p>
                    <p className="font-semibold">
                      Sub Region:{" "}
                      <span className="font-thin">{country[0].subregion}</span>
                    </p>
                    <p className="font-semibold">
                      Capital:{" "}
                      <span className="font-thin">{country[0].capital}</span>
                    </p>
                    <br />
                    <p className="font-semibold">
                      Top Level Domain:{" "}
                      <span className="font-thin">{country[0].tld}</span>
                    </p>
                    <p className="font-semibold">
                      Currencies:{" "}
                      <span className="font-thin">
                        {currenciesAll(country[0].currencies)}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Languages:
                      <span className="font-thin">
                        {languagesAll(country[0].languages)}
                      </span>
                    </p>
                    <br />
                    <p className="font-semibold">Border Countries:</p>
                    <div className="flex flex-wrap mb-9">
                      {bordersAll(country[0])}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
}
