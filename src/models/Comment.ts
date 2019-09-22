import { Emotion } from './Emotion';
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

  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  commentLikeCount: number;

  /* Comment-User */
  @BelongsToMany(() => User, () => UserComment)
  users: User[];

  /* Comment-Post */
  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  /* Comment-Emotion */
  @ForeignKey(() => Emotion)
  @Column(DataType.INTEGER)
  emotionId: number;

  @BelongsTo(() => Emotion)
  emotion: Emotion;
}
