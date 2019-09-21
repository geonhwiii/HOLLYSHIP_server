import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique
} from 'sequelize-typescript';

// TODO: User Table
@Table
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(30))
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  name: string;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  userImage: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  intro: string;
}
