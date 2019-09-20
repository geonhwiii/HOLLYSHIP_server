import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const userRouter = Router();

/******************************************************************************
 * ?                      Get ALL User Info - "GET /user"
 ******************************************************************************/
userRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
);

/******************************************************************************
 * ?                     GET User Info - "GET /user/:id"
 ******************************************************************************/
userRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  User.findByPk(req.params.id)
    .then(user => (user ? res.json(user) : next({ statusCode: 404 })))
    .catch(next)
);

export default userRouter;
