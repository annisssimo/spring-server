import { HTTP_STATUS_CODES } from '../constants/httpStatusCode.js';
import { ProjectService } from '../services/projectService.js';

export const getProjects = async (req, res) => {
  try {
    const searchQuery = req.query.search;

    const filteredProjects =
      await ProjectService.getFilteredProjects(searchQuery);

    res.status(HTTP_STATUS_CODES.OK).json(filteredProjects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to fetch projects',
    });
  }
};
