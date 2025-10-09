const BASE_URL = 'http://localhost:3000/countries/';

export const ALL_COUNTRIES = BASE_URL;

export const searchByCountry = (name) => BASE_URL + 'name/' + name;
