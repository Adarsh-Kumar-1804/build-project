import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/index.js';

const app = express();

app.use(bodyParser.json());

app.use('/api', router);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
