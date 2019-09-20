import express, {
  Application,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import 'dotenv/config';
import router from './routes';
import { sequelize } from './models';
import passportConfig from './passport';

const app: Application = express();
sequelize.sync();
passportConfig(passport);

// TODO: Set Port 8080
app.set('port', process.env.PORT || 8001);

// TODO: Use Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

interface Err extends Error {
  status: number;
  data?: any;
}

// TODO: Prevent CORS Error
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', 'x-total-count');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type,authorization');
  next();
});

// TODO:  GET '/holly'
app.get(
  '/holly',
  (req: Request, res: Response, next: NextFunction): Response =>
    res.send('HOLLYSHIP')
);

app.use('/', router);

// TODO: Catch 404 handler
app.use((req: Request, res: Response, next: NextFunction): void => {
  const err = new Error('Not Found...') as Err;
  err.status = 403;
  next(err);
});

// TODO: Handle Error
app.use((err: Err, req: Request, res: Response, next: NextFunction): void => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

export default app;
