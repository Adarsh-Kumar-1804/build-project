import express from 'express';
import bodyParser from 'body-parser';
import { createProxyMiddleware } from 'http-proxy-middleware';

import projectRoutes from './routes/index.js';

const MOCK_SERVICE = 'http://localhost:3000/';

const app = express();

app.use(bodyParser.json());

app.use('/api/projects', projectRoutes);

app.use(
  '/api',
  createProxyMiddleware({
    target: MOCK_SERVICE,
    changeOrigin: true,
  })
);

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
