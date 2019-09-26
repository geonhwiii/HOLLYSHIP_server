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
        { model: Musics, attributes: ['id', 'title', 'thumbnail', 'artist'] }
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
          { model: Musics, attributes: ['id', 'title', 'thumbnail', 'artist'] }
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
