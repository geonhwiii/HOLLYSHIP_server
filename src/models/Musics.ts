import { MusicPlayList } from './MusicPlayList';
import { PlayList } from './PlayList';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BelongsToMany
} from 'sequelize-typescript';

// TODO: Musics Table
@Table
export class Musics extends Model<Musics> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  title: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  thumbnail: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  artist: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  playTime: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  genre: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  youtubeUrl: string;

  /* PlayList-Musics */
  @BelongsToMany(() => PlayList, () => MusicPlayList)
  playlists: PlayList[];
}
