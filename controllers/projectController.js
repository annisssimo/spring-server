import { HttpStatusCode } from '../utils/httpStatusCode.js';
import { ProjectService } from '../services/projectService.js';

export const getProjects = (req, res) => {
  const searchQuery = req.query.search;

  const filteredProjects = ProjectService.getFilteredProjects(searchQuery);

  res.status(HttpStatusCode.OK).json(filteredProjects);
};
