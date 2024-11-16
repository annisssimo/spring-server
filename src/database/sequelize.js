import { Sequelize } from 'sequelize';
import { config } from '../config/database.js';

export const sequelize = new Sequelize(
  `postgres://${config.username}:${config.password}@${config.host}:5432/${config.database}`,
);
