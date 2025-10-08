import { Request, Response } from 'express';

const BASE_URL = 'https://restcountries.com/v2/';

const ALL_COUNTRIES =
  BASE_URL + 'all?fields=name,capital,flags,population,region';

export const getAllCountries = async (req: Request, res: Response) => {
  const response = await fetch(ALL_COUNTRIES);
  const data = await response.json();
  res.json(data);
};

export const getCountryByName = async (req: Request, res: Response) => {
  const { name } = req.params;
  console.log(name)
  const response = await fetch(`${BASE_URL}name/${name}`);
  const data = await response.json();
  res.json(data);
};

export const getCountiesByCode = async (req: Request, res: Response) => {
  const { codes } = req.params;
  const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
  const data = await response.json();
  res.json(data);
};
