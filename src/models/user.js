import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize.js';

export class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
  },
  {
    sequelize, // это важно, потому что нужно передать sequelize, чтобы он знал, в какую базу данных подключаться
    modelName: 'User', // указываем имя модели
    tableName: 'users', // указываем имя таблицы в базе данных (опционально)
  },
);
