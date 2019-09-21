import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  AutoIncrement,
  PrimaryKey
} from 'sequelize-typescript';

// TODO: Post Table
@Table
export class Post extends Model<Post> {
  @AllowNull(false)
  @Column(DataType.STRING(120))
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
