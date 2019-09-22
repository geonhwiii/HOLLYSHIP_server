import { Emotion } from './Emotion';
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
  HasMany
} from 'sequelize-typescript';

// TODO: Post Table
@Table
export class Post extends Model<Post> {
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

  /* Post-Emotion */
  @ForeignKey(() => Emotion)
  @Column(DataType.INTEGER)
  emotionId: number;

  @BelongsTo(() => Emotion)
  emotion: Emotion;
}
