import { Post } from './Post';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  HasMany,
  ForeignKey,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

// TODO: Users Table
@Table
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(30))
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  userImage: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  intro: string;

  @HasMany(() => Post)
  posts: Post[];
}
