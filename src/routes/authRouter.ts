import { User } from './../models/User';
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn } from './middlewares';

const authRouter = express.Router();

/******************************************************************************
 * ?                     POST User - "POST /auth/signup"
 ******************************************************************************/
authRouter.post(
  '/signup',
  isNotLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, name, password } = req.body;
    try {
      const existAccount = await User.findOne({ where: { userId } });
      if (existAccount) {
        res.status(304).send('Aleady Exist UserId');
      }
      const hash = await bcrypt.hash(password, 12);
      const account = await User.create({ userId, name, password: hash });
      res.json(account);
    } catch (e) {
      console.log(e.message);
      res.status(500).send('Server Error');
    }
  }
);

/******************************************************************************
 * ?                     POST User - "POST /auth/login"
 ******************************************************************************/
authRouter.post(
  '/login',
  isNotLoggedIn,
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (authError: Error, user, info) => {
      if (authError) {
        console.error(authError);
        return next(authError);
      }
      if (!user) {
        res.status(403).send(info.message);
      }
      return req.login(user, (loginError: Error) => {
        if (loginError) {
          console.error(loginError);
          res.status(403).send(loginError);
        }
        res.send(user);
      });
    })(req, res, next);
  }
);

authRouter.get('/logout', isLoggedIn, (req: Request, res: Response) => {
  req.logOut();
  req.session.destroy((err: Error) => {
    if (err) res.sendStatus(500);
  });
  res.send('Logout success');
});

export default authRouter;
