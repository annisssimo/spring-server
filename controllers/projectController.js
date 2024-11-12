import { projects } from '../models/projectModel.js';

export const getProjects = (req, res) => {
  const searchQuery = req.query.search ? req.query.search.toLowerCase() : '';

  const filteredProjects = projects.filter(
    (proj) =>
      proj.title.toLowerCase().includes(searchQuery) ||
      proj.description.toLowerCase().includes(searchQuery),
  );

  res.status(200).json(filteredProjects);
};
