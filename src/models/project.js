import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

export class Project extends Model {}

Project.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
  },
);
