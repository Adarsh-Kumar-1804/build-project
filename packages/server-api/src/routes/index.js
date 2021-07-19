import express from 'express';

import {
  getBuilds,
  getBuildfromId,
  getPipelines,
  getPipelineFromId,
  getResultsFromId,
  getAllBuildsOfPipeline,
  getFromCache,
  getPipelineSummary,
} from '../services/projectservice.js';

const router = express.Router();

router.get('/builds', getBuilds);

router.get('/builds/:id', getBuildfromId);

router.get('/pipelines', getPipelines);

router.get('/pipelines/:id', getPipelineFromId);

router.get('/pipelines/:id/builds', getResultsFromId);

router.get('/pipelines/builds/:id', getAllBuildsOfPipeline);

router.get('/pipelines/builds/pipeline-summary', getPipelineSummary);

export default router;
