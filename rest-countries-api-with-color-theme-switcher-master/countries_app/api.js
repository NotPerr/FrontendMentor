// get all countries
export async function getCountries() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw {
      message: "Failed to fetch countries",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

// search country by name
export async function searchCountry(name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw {
      message: "Failed to fetch the country by name",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

// get a country by ccn3
export async function getCountry(ccn3) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${ccn3}`);
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw {
      message: "Failed to fetch the country by ccn3",
      statusText: res.statusText,
      status: res.status,
    };
  }
}
