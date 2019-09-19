import { Sequelize, Model, DataTypes } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

class User extends Model {
  public id!: number;
  public userId!: string;
  public name!: string;
  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize
  }
);
