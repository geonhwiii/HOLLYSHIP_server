import { Comment } from './Comment';
import { User } from './User';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

// TODO: Post Table
@Table
export class Post extends Model<Post> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  title: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  content: string;

  /* Post-User */
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  /* Post-Comment */
  @HasMany(() => Comment)
  comments: Comment[];

  /* Emotion */
  @AllowNull(false)
  @Column(DataType.ENUM('blank', 'happy', 'sad', 'upset', 'chill', 'fear'))
  emotion: string;
}
