import { MusicPlayList } from './MusicPlayList';
import { Musics } from './Musics';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
  AllowNull,
  BelongsToMany
} from 'sequelize-typescript';
import { User } from './User';

// TODO: PlayLists Table
@Table
export class PlayList extends Model<PlayList> {
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  listName: string;

  /* PlayList-User */
  @BelongsTo(() => User)
  user: User;

  /* PlayList-Musics */
  @BelongsToMany(() => Musics, () => MusicPlayList)
  musics: Musics[];
}
