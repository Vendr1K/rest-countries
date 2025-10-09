import { extractNames } from '../helpers';

type CountryFields = {
  name: string;
  nativeName: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
  languages: {
    iso639_1?: string;
    iso639_2?: string;
    name: string;
    nativeName?: string;
  }[];
  borders: string[];
  neighbors?: string[];
};

function isCountryFields(obj: any): obj is CountryFields {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.name === 'string' &&
    typeof obj.nativeName === 'string' &&
    typeof obj.flag === 'string' &&
    typeof obj.capital === 'string' &&
    typeof obj.population === 'number' &&
    typeof obj.region === 'string' &&
    typeof obj.subregion === 'string' &&
    Array.isArray(obj.topLevelDomain) &&
    Array.isArray(obj.currencies) &&
    Array.isArray(obj.languages) &&
    Array.isArray(obj.borders) &&
    (obj.neighbors === undefined || Array.isArray(obj.neighbors))
  );
}

export const transformCountry = (country: unknown) => {
  if (!isCountryFields(country)) {
    throw new Error('Invalid country object');
  }
  return {
    name: country.name,
    nativeName: country.nativeName,
    flag: country.flag,
    capital: country.capital,
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.topLevelDomain,
    currencies: extractNames(country.currencies),
    languages: extractNames(country.languages),
    borders: country.borders,
    neighbors: country.neighbors || [],
  };
};
