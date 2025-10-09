type NativeName = {
  [langCode: string]: {
    common: string;
    official: string;
  };
};

type Currencies = {
  [currency: string]: {
    name: string;
    symbol: string;
  };
};

export type Neighbors = {
  common: string;
  official: string;
  nativeName: NativeName;
};

type CountryFields = {
  name: {
    common: string;
    official: string;
    nativeName: NativeName;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  tld: string[];
  currencies: Currencies;
  languages: {
    [langCode: string]: string;
  };
  borders: string[];
};

type MappedCountry = {
  name: string;
  nativeName: string;
  flag: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borders: string[];
  neighbors: string[];
};

const extractNativeNames = (nativeNameObj: NativeName): string => {
  return Object.values(nativeNameObj)
    .map((name) => name.common)
    .join(', ');
};

const extractCurrencies = (currencies: Currencies): string[] => {
  return Object.values(currencies).map((currency) => currency.name);
};

const extractValues = (obj: { [key: string]: string }): string[] => {
  return Object.values(obj);
};

export const transformCountry = (country: CountryFields): MappedCountry => {
  return {
    name: country.name.common,
    nativeName: extractNativeNames(country.name.nativeName),
    flag: country.flags.svg,
    capital: country.capital[0],
    population: country.population,
    region: country.region,
    subregion: country.subregion,
    topLevelDomain: country.tld,
    currencies: extractCurrencies(country.currencies),
    languages: extractValues(country.languages),
    borders: country.borders,
    neighbors: [],
  };
};
