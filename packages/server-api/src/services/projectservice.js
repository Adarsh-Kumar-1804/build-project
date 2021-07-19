import { builds, pipelines } from '../data/data.js';
import fetch from 'node-fetch';
import NodeCache from 'node-cache';

const myCache = new NodeCache({ stdTTL: 10 });

export const getFromCache = (req, res, next) => {
  const key = `data${req.route.path}`;

  if (myCache.has(key)) {
    console.log(`Retrieving data from Cache key: ${key}`);
    return res.send(myCache.get(key));
  }
  next();
};

export const getBuilds = (req, res) => {
  const key = `data${req.route.path}`;
  myCache.set(key, builds);
  res.send(builds);
};

export const getBuildfromId = (req, res) => {
  const { id } = req.params;
  const key = `data${req.route.path}`;

  const selectBuilt = builds.filter((build) => build.id === parseInt(id, 10));
  myCache.set(key, selectBuilt[0]);

  res.send(selectBuilt[0]);
};

export const getPipelines = (req, res) => {
  const key = `data${req.route.path}`;
  myCache.set(key, pipelines);
  res.send(pipelines);
};

export const getPipelineFromId = (req, res) => {
  const key = `data${req.route.path}`;
  const { id } = req.params;

  const selectedPipeline = pipelines.filter(
    (pipeline) => pipeline.id === parseInt(id, 10)
  );

  myCache.set(key, selectedPipeline[0]);
  res.send(selectedPipeline[0]);
};

export const getResultsFromId = async (req, res) => {
  const key = `data${req.route.path}`;
  let results = {};
  let array = [];
  const { id } = req.params;
  const builds = await (
    await fetch(`${req.protocol}://${req.get('host')}/api/builds`)
  ).json();
  const selected = builds.filter(
    (build) => build.pipelineId === parseInt(id, 10)
  );

  selected.forEach((element) => {
    results[element.pipelineId] = {
      total:
        ((results[element.pipelineId] && results[element.pipelineId].total) ||
          0) + element.duration,
      count:
        ((results[element.pipelineId] && results[element.pipelineId].count) ||
          0) + 1,
      avg:
        (results[element.pipelineId] &&
          (results[element.pipelineId].total + element.duration) /
            (results[element.pipelineId].count + 1)) ||
        element.duration,
    };
  });

  array.push(results[`${id}`]);
  myCache.set(key, array);
  res.send(array);
};

export const getAllBuildsOfPipeline = async (req, res) => {
  const key = `data${req.route.path}`;
  const { id } = req.params;
  const builds = await (
    await fetch(`${req.protocol}://${req.get('host')}/api/builds`)
  ).json();
  const selected = builds.filter(
    (build) => build.pipelineId === parseInt(id, 10)
  );
  myCache.set(key, selected);
  res.send(selected);
};

export const getPipelineSummary = async (req, res) => {};
