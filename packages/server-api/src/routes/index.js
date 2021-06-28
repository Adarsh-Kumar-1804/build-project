import express from 'express';

import {
  getProjects,
  createProject,
  getProject,
  deleteProject,
  getFromCache,
} from '../services/projectservice.js';

const router = express.Router();

router.get('/', getFromCache, getProjects);

router.post('/', createProject);

router.get('/:id', getFromCache, getProject);

router.delete('/:id', deleteProject);

export default router;
