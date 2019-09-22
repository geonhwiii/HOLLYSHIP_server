import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';

// TODO: Follow Table
@Table
export class Follow extends Model<Follow> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  followerId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  followingId: number;

  /* Follow-User */
  @BelongsTo(() => User, 'followerId')
  follower: User;

  @BelongsTo(() => User, 'follwingId')
  following: User;
}
