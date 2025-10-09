type CountryFields = {
  name: {
    common: string;
    official: string;
    nativeName: unknown;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital: string[];
  population: number;
  region: string;
};

type MappedCountry = {
  name: string;
  capital: string;
  population: number;
  region: string;
  flags: {
    png: string;
    svg: string;
  };
};

const mapCountry = (country: CountryFields): MappedCountry => {
  return {
    name: country.name.common,
    capital: country.capital[0],
    population: country.population,
    region: country.region,
    flags: {
      png: country.flags.png,
      svg: country.flags.svg,
    },
  };
};

const compareCountryNames = (a: MappedCountry, b: MappedCountry): number => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const transformAllCountries = (countries: CountryFields[]) => {
  return countries.map(mapCountry).sort(compareCountryNames);
};
