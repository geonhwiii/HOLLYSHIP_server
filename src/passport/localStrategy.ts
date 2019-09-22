import { User } from './../models/User';
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';

export default class Local {
  public static init(_passport: any) {
    _passport.use(
      new Strategy(
        { usernameField: 'email', passwordField: 'password' },
        async (email: string, password: string, done: Function) => {
          try {
            const account = await User.findOne({ where: { email } });
            if (account) {
              const result = await bcrypt.compare(password, account.password);
              if (result) {
                done(null, account);
              } else {
                done(null, false, { message: 'Undefined email or Password' });
              }
            } else {
              done(null, false, { message: 'Undefined email or Password' });
            }
          } catch (err) {
            console.error(err);
            done(err);
          }
        }
      )
    );
  }
}
