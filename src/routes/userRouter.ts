import { UserPostLike } from './../models/UserPostLike';
import { Post } from './../models/Post';
import { Musics } from './../models/Musics';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const userRouter = Router();

/******************************************************************************
 * ?                      Get ALL User Info - "GET /user"
 ******************************************************************************/
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Find All User Info with Like Musics
    const users = await User.findAll({
      include: [
        {
          model: Musics,
          attributes: ['id', 'title', 'thumbnail', 'artist']
        },
        {
          model: UserPostLike,
          attributes: ['id', 'postId'],
          include: [{ model: Post, attributes: ['title'] }]
        }
      ]
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/******************************************************************************
 * ?                     GET User Info - "GET /user/:id"
 ******************************************************************************/
userRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find a User Info with Like Musics
      const user = await User.findByPk(req.params.id, {
        include: [
          { model: Musics, attributes: ['id', 'title', 'thumbnail', 'artist'] },
          {
            model: UserPostLike,
            attributes: ['id', 'postId'],
            include: [{ model: Post, attributes: ['title'] }]
          }
        ]
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default userRouter;
