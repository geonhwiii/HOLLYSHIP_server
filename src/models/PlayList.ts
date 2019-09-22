import { Musics } from './Musics';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './User';

// TODO: PlayLists Table
@Table
export class PlayList extends Model<PlayList> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;
  /* PlayList-User */
  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Musics)
  musics: Musics[];
}
