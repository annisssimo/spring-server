import { sequelize } from './sequelize.js';
import '../models/project.js';
import '../models/user.js';

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export { sequelize, initializeDatabase };
