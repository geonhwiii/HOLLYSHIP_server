import { MusicPlayList } from './MusicPlayList';
import { UserComment } from './UserComment';
import { Follow } from './Follow';
import { PlayList } from './PlayList';
import { Comment } from './Comment';
import { Musics } from './Musics';
import { Post } from './Post';
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
  models: [
    User,
    Post,
    Musics,
    Comment,
    PlayList,
    Follow,
    UserComment,
    MusicPlayList
  ]
});

// TODO: Check connection
sequelize
  .authenticate()
  .then(() => console.log('Connection Successed!'))
  .catch((err: Error) => console.error('Unable to connect to the MySQL', err));
