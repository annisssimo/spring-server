import { Op } from 'sequelize';
import { Project } from '../models/project.js';

export class ProjectService {
  static async getFilteredProjects(searchQuery) {
    const query = searchQuery ? searchQuery.toLowerCase() : '';

    const projects = await Project.findAll({
      where: query
        ? {
            [Op.or]: [
              { title: { [Op.iLike]: `%${query}%` } },
              { description: { [Op.iLike]: `%{query}%` } },
            ],
          }
        : {},
    });

    return projects;
  }
}
