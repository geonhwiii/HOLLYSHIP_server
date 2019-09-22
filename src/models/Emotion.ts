import { Comment } from './Comment';
import { Post } from './Post';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  HasMany
} from 'sequelize-typescript';

// TODO: Emotions Table
@Table
export class Emotion extends Model<Emotion> {
  @AllowNull(false)
  @Column(DataType.ENUM('blank', 'happy', 'sad', 'upset', 'chill', 'fear'))
  emotion: string;

  /* Emotion-Post */
  @HasMany(() => Post)
  posts: Post[];

  /* Emotion-Comment */
  @HasMany(() => Comment)
  comments: Comment[];
}
