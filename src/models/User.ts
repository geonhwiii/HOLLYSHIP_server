import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull
} from 'sequelize-typescript';

// TODO: User Table
@Table
export class User extends Model<User> {
  @AllowNull(false)
  @Column(DataType.STRING(30))
  userId: string;

  @AllowNull(false)
  @Column(DataType.STRING(30))
  password: string;
}
