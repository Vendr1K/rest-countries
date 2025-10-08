import { Request, Response, NextFunction } from 'express';
import { transformCountry } from '../converters';
import { NotFoundError } from '../errors';

const BASE_URL = 'https://restcountries.com/v2/';

const ALL_COUNTRIES =
  BASE_URL + 'all?fields=name,capital,flags,population,region';

export const getAllCountries = async (req: Request, res: Response) => {
  const response = await fetch(ALL_COUNTRIES);
  const data = await response.json();
  res.json(data);
};

export const getCountryByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.params;

  const response = await fetch(`${BASE_URL}name/${name}`);
  const data = await response.json();

  const country = data[0];

  if (!country) return next(new NotFoundError('Country Not Found'));

  const preparedCountry = transformCountry(country);

  res.json(preparedCountry);
};

export const getCountiesByCode = async (req: Request, res: Response) => {
  const { codes } = req.query;

  const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
  const data = await response.json();
  res.json(data);
};
