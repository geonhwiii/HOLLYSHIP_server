import { Post } from './Post';
import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';

// TODO: UserPostLikes Table
@Table
export class UserPostLike extends Model<UserPostLike> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Post)
  @Column(DataType.INTEGER)
  postId: number;

  @BelongsTo(() => User)
  userInfo: User;
  @BelongsTo(() => Post)
  postInfo: Post;
}
