import { Musics } from './Musics';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  HasMany,
  BelongsTo
} from 'sequelize-typescript';
import { User } from './User';

// TODO: PlayLists Table
@Table
export class PlayList extends Model<PlayList> {
  @Column(DataType.STRING)
  userId: string;

  @Column(DataType.INTEGER)
  musicId: number;
}
