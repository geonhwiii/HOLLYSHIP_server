require('dotenv');
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  RequestHandler
} from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import expressSession from 'express-session';

const app: Application = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

interface Err extends Error {
  status: number;
  data?: any;
}

// TODO: Set Port 3000
app.set('port', process.env.PORT || 8080);

// TODO:  GET '/'
app.get('/', (req: Request, res: Response, next: NextFunction) =>
  res.send('HOLLYSHIP')
);

// TODO: Catch 404 handler
app.use((req, res, next) => {
  const err = new Error('Not Found...') as Err;
  err.status = 403;
  next(err);
});

// TODO: Handle Error
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    data: err.data
  });
});

export default app;
