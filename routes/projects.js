import express from 'express';
import { projects } from '../data/projects.js';

const router = express.Router();

router.get('/projects', (req, res) => {
  const searchQuery = req.query.search.toLowerCase();

  const filteredProjects = projects.filter(
    (proj) =>
      proj.title.toLowerCase().includes(searchQuery) ||
      proj.description.toLowerCase().includes(searchQuery)
  );

  res.status(200).json(filteredProjects);
});

export default router;
