import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull
} from 'sequelize-typescript';

// TODO: Follow Table
@Table
export class Follow extends Model<Follow> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  followerId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  followerName: string;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  followingId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  followingName: string;

  /* Follow-User */
  @BelongsTo(() => User, 'followerId')
  follower: User;

  @BelongsTo(() => User, 'followingId')
  following: User;
}
