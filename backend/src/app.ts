import express from 'express';

import cors from 'cors';
import router from './routes';

const port = 3000;

const app = express();

app.use(cors());
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
