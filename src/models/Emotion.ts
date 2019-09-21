import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull
} from 'sequelize-typescript';

// TODO: Emotions Table
@Table
export class Emotion extends Model<Emotion> {
  @AllowNull(false)
  @Column(DataType.ENUM('blank', 'happy', 'sad', 'upset', 'chill', 'fear'))
  emotion: string;
}
