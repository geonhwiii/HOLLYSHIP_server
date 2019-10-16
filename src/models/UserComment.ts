import { Comment } from './Comment';
import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  Default,
  AllowNull
} from 'sequelize-typescript';

// TODO: UserComments Table
@Table
export class UserComment extends Model<UserComment> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Comment)
  @Column(DataType.INTEGER)
  commentId: number;
}
