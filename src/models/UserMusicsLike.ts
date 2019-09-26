import { Musics } from './Musics';
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

// TODO: UserMusicsLikes Table
@Table
export class UserMusicsLike extends Model<UserMusicsLike> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Musics)
  @Column(DataType.INTEGER)
  musicId: number;
}
