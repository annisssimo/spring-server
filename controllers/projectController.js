import { HTTP_STATUS_CODES } from '../utils/httpStatusCode.js';
import { ProjectService } from '../services/projectService.js';

export const getProjects = (req, res) => {
  const searchQuery = req.query.search;

  const filteredProjects = ProjectService.getFilteredProjects(searchQuery);

  res.status(HTTP_STATUS_CODES.OK).json(filteredProjects);
};
