import { projects } from '../models/projectModel.js';

export class ProjectService {
  static getFilteredProjects(searchQuery) {
    const query = searchQuery ? searchQuery.toLowerCase() : '';
    return projects.filter(
      (proj) =>
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query),
    );
  }
}
