import { Router } from 'express';
import {
  getAllCountries,
  getCountryByName,
  getCountiesByCode,
} from '../controllers';

const router = Router();

router.get('/', getAllCountries);
router.get('/name/:name', getCountryByName);
router.get('/alpha', getCountiesByCode);

export default router;
