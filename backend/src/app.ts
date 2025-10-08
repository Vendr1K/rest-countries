import express from 'express';

import cors from 'cors';
import router from './routes';
import { errorHandler } from './middlewares';

const port = 3000;

const app = express();

app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
