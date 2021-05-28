import express from 'express';

import {
  getProjects, createProject, getProject, deleteProject,
} from '../services/projects.js';

const router = express.Router();

router.get('/', getProjects);

router.post('/', createProject);

router.get('/:id', getProject);

router.delete('/:id', deleteProject);

export default router;
