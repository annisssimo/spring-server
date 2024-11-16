import { Project } from '../models/project.js';
import { projects } from '../data/projects.js';
import { sequelize } from './index.js';

(async function syncAndSeed() {
  try {
    await sequelize.sync({ force: true });

    for (let project of projects) {
      await Project.create(project);
    }

    console.log('Data has been inserted successfully.');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
})();
