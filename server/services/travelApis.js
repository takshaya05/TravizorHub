import axios from "axios";

export const getVisaInfo = async (country) => {
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );

    const data = res.data?.[0];

    if (!data) return null;

    return {
      country: data.name?.common || country,
      region: data.region || "",
      subregion: data.subregion || "",
      independent: data.independent ?? null,
      currencies: data.currencies || {},
      languages: data.languages || {},
      capital: data.capital?.[0] || ""
    };
  } catch {
    return null;
  }
};

export const getCountryBasics = async (country) => {
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    );

    const data = res.data?.[0];

    if (!data) return null;

    return {
      name: data.name?.common || country,
      capital: data.capital?.[0] || "",
      population: data.population || 0,
      area: data.area || 0,
      timezones: data.timezones || [],
      continents: data.continents || [],
      flag: data.flags?.svg || ""
    };
  } catch {
    return null;
  }
};