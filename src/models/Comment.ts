import { Post } from './Post';
import { UserComment } from './UserComment';
import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  BelongsToMany,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';

// TODO: Comments Table
@Table
export class Comment extends Model<Comment> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  comment: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  commentUsername: string;

  /* Comment-User */
  @BelongsToMany(() => User, () => UserComment)
  users: User[];

  /* Comment-Post */
  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
