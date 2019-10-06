import { Musics } from './../models/Musics';
import { UserComment } from './../models/UserComment';
import { User } from './../models/User';
import { Comment } from './../models/Comment';
import { Router, Request, Response, NextFunction } from 'express';

const commentRouter = Router();

/******************************************************************************
 * ?                   Get ALL Comment Info - "GET /comment"
 ******************************************************************************/
commentRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find all comment with User data
      const comments = await Comment.findAll({
        include: [
          { model: User, attributes: ['email', 'username', 'userImage'] },
          { model: Musics },
        ],
        attributes: ['id', 'comment', 'commentUsername', 'postId', 'createdAt'],
      });
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                      POST Write Comment Info - "POST /comment"
 ******************************************************************************/
commentRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find Username
      const userId = req.session.passport.user;
      const user = await User.findOne({ where: { id: userId } });
      const commentUsername = user.username;
      // TODO: Create Comment table
      const { comment, postId, musicId } = req.body;
      if (!comment) {
        return res.status(403).json({ message: 'Comment cannot be null!' });
      }
      const com = await Comment.create({
        comment,
        postId,
        musicId,
        commentUsername,
      });
      // TODO: Create Usercommnet table
      const commentId = com.id;
      const usercomment = await UserComment.create({ userId, commentId });
      res.json({ message: 'ADD COMMENT SUCCESS!' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                      DELETE Comment in POST - "DELETE /comment/:id"
 ******************************************************************************/
commentRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.passport.user;
      const commentId = req.params.id;
      // TODO: Delete comment in UserComment
      await UserComment.destroy({ where: { userId, commentId } });
      // TODO: Delete comment in Comment
      await Comment.destroy({ where: { id: commentId } });
      res.json({ message: 'DELETE COMMENT SUCCESS!' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default commentRouter;
