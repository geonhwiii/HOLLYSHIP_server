import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const userRouter = Router();

/******************************************************************************
 * ?                      Get ALL User Info - "GET /api/user"
 ******************************************************************************/
userRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
);

/******************************************************************************
 * ?                     GET User Info - "GET /api/user/:id"
 ******************************************************************************/
userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  User.findByPk(req.params.id)
    .then(user => (user ? res.json(user) : next({ statusCode: 404 })))
    .catch(next)
);

/******************************************************************************
 * ?                     POST User - "GET /api/user"
 ******************************************************************************/
userRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await User.create({
        userId: req.body.userId,
        password: req.body.password
      });
      res.json(account);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('Server Error');
    }
  }
);

export default userRouter;
