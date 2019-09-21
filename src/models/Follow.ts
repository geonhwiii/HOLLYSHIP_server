import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey
} from 'sequelize-typescript';

// TODO: Follow Table
@Table
export class Follow extends Model<Follow> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  fromId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  toId: number;
}
