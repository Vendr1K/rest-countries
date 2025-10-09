import { Request, Response, NextFunction } from 'express';
import { transformCountry } from '../converters';
import { NotFoundError } from '../errors';
import { ALL_COUNTRIES, BASE_URL } from '../constants';
import { extractNames } from '../helpers';

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

  let neighbors: string[] = [];

  if (preparedCountry.borders.length !== 0) {
    neighbors = await getNeighbors(preparedCountry.borders.join(','));
  }

  preparedCountry.neighbors = neighbors;

  res.json(preparedCountry);
};

export const getCountiesByCode = async (req: Request, res: Response) => {
  const { codes } = req.query;

  const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
  const data = await response.json();
  res.json(data);
};

export const getNeighbors = async (codes: string): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}alpha?codes=${codes}`);
  const data = await response.json();
  return extractNames(data);
};
