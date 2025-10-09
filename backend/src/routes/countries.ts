import { Router } from 'express';
import { getAllCountries, getCountryByName } from '../controllers';

const router = Router();

router.get('/', getAllCountries);
router.get('/name/:name', getCountryByName);

export default router;
