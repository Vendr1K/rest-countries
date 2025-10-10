import { Router } from 'express';
import { getAllCountries, getCountryByName } from '../controllers';
import { publicCache } from '../middlewares';

const router = Router();

router.get('/', [publicCache], getAllCountries);
router.get('/name/:name', [publicCache], getCountryByName);

export default router;
