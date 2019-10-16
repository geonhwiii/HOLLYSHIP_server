import { User } from './../models/User';
import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { isLoggedIn, isNotLoggedIn, verifyToken } from './middlewares';
import generateToken from '../lib/token';

const authRouter = express.Router();

/******************************************************************************
 * ?                     POST User - "POST /auth/signup"
 ******************************************************************************/
authRouter.post(
  '/signup',
  isNotLoggedIn,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      if (!email || !username || !password) {
        return res
          .status(409)
          .json({ message: "email & username & password can't be null" });
      }
      const existAccount = await User.findOne({ where: { email } });
      if (existAccount) {
        return res
          .status(409)
          .json({ code: 409, message: 'Aleady Exist email' });
      }
      const hash = await bcrypt.hash(password, 12);
      const account = await User.create({ email, username, password: hash });
      return res.json({ message: 'USER SIGNUP SUCCESS!' });
    } catch (e) {
      res.status(500).json({ code: 500, message: 'SERVER ERROR' });
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
        return next(authError);
      }
      if (!user) {
        res.status(403).json({ code: 403, message: info.message });
        return;
      }
      return req.login(user, async (loginError: Error) => {
        if (loginError) {
          res.status(403).json({ code: 403, message: loginError });
          return;
        }
        // TODO: Generate signed JsonWebToken
        const payload = {
          id: user.dataValues.id,
          email: user.dataValues.email
        };
        const token = await generateToken(payload);
        req.session['access_token'] = token;
        res.json({ message: 'USER LOGIN SUCCESS with TOKEN!', token });
      });
    })(req, res, next);
  }
);

authRouter.get('/logout', isLoggedIn, (req: Request, res: Response) => {
  req.logOut();
  req.session.destroy((err: Error) => {
    if (err) res.status(500).json({ code: 500, message: 'SERVER ERROR' });
  });
  res.json({ message: 'LOGOUT SUCCESS' });
});

export default authRouter;
