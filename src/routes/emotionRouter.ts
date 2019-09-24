import { User } from './../models/User';
import { Comment } from './../models/Comment';
import { Post } from './../models/Post';
import { Router, Request, Response, NextFunction } from 'express';

const emotionRouter = Router();

/******************************************************************************
 * ?                      Get ALL Emotion Info - "GET /emoji"
 ******************************************************************************/
emotionRouter.get(
  '/:emoji',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const emotion = await Post.findAll({
        where: { emotion: req.params.emoji },
        include: [
          { model: User, attributes: ['email', 'username', 'userImage'] }
        ]
      });
      res.json(emotion);
    } catch (err) {
      console.error(err);
      res.status(500).send('SERVER ERROR');
    }
  }
);

export default emotionRouter;
