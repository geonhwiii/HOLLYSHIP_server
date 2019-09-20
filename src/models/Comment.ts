import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull
} from 'sequelize-typescript';

// TODO: Commnets Table
@Table
export class Comment extends Model<Comment> {
  @AllowNull(false)
  @Column(DataType.TEXT)
  comment: string;

  @AllowNull(true)
  @Column(DataType.INTEGER.UNSIGNED)
  commentLikeCount: number;
}
