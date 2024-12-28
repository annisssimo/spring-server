import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ProjectService } from '../services/projectService.js';

export const getProjects = async (req, res, next) => {
  try {
    const searchQuery = req.query.search;

    const filteredProjects =
      await ProjectService.getFilteredProjects(searchQuery);

    res.status(HTTP_STATUS_CODES.OK).json(filteredProjects);
  } catch (error) {
    next(error);
  }
};
