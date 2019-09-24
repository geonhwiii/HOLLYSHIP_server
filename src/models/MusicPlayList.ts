import { PlayList } from './PlayList';
import { Musics } from './Musics';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';

// TODO: Music-PlayList Table
@Table
export class MusicPlayList extends Model<MusicPlayList> {
  @ForeignKey(() => Musics)
  @Column(DataType.INTEGER)
  musicId: number;

  @ForeignKey(() => PlayList)
  @Column(DataType.INTEGER)
  playlistId: number;
}
