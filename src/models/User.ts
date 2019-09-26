import { UserPostLike } from './UserPostLike';
import { UserMusicsLike } from './UserMusicsLike';
import { Musics } from './Musics';
import { UserComment } from './UserComment';
import { Comment } from './Comment';
import { Follow } from './Follow';
import { PlayList } from './PlayList';
import { Post } from './Post';
import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  Unique,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';

// TODO: Users Table
@Table
export class User extends Model<User> {
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(30))
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(120))
  password: string;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(30))
  username: string;

  @AllowNull(true)
  @Column(DataType.STRING(120))
  userImage: string;

  @AllowNull(true)
  @Column(DataType.TEXT)
  intro: string;

  /* User-Follow #1 */
  @HasMany(() => Follow, 'followingId')
  followers: Follow[];

  /* User-Follow #2 */
  @HasMany(() => Follow, 'followerId')
  following: Follow[];

  /* User-Post */
  @HasMany(() => Post)
  posts: Post[];

  /* User-PostLike */
  @HasMany(() => UserPostLike)
  likePosts: UserPostLike[];

  /* User-PlayList */
  @HasMany(() => PlayList)
  playlists: PlayList[];

  /* User-Comment */
  @BelongsToMany(() => Comment, () => UserComment)
  comments: Comment[];

  /* User-Music */
  @BelongsToMany(() => Musics, () => UserMusicsLike)
  likeMusics: Musics[];
}
