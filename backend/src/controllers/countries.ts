import { Request, Response, NextFunction } from 'express';
import { transformAllCountries, transformCountry } from '../converters';
import { NotFoundError } from '../errors';
import { ALL_COUNTRIES, BASE_URL } from '../constants';

import { getNeighbors } from '../services';

export const getAllCountries = async (req: Request, res: Response) => {
  const response = await fetch(ALL_COUNTRIES);
  const data = await response.json();

  res.json(transformAllCountries(data));
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
