import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config')[env];

const { username, password, database, dialect, host } = config;

// TODO: Connect to MySQL
export const sequelize = new Sequelize({
  username,
  password,
  database,
  dialect,
  host,
  models: [User]
});

// TODO: Check connection
sequelize
  .authenticate()
  .then(() => console.log('Connection Successed!'))
  .catch((err: Error) => console.error('Unable to connect to the MySQL', err));
