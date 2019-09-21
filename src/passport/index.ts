import { User } from './../models/User';
import localStrategy from './localStrategy';

export default function(passport: any) {
  passport.serializeUser((user: any, done: Function) => {
    done(null, user.id);
  });
  passport.deserializeUser((id: number, done: Function) => {
    User.findOne({ where: { id } })
      .then(user => done(null, user))
      .catch((err: Error) => done(err));
  });
  localStrategy.init(passport);
}
