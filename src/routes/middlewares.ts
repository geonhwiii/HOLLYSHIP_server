import { Request, Response, NextFunction } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('Login Required');
  }
};

export const isNotLoggedIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('Aleady Logged In');
  }
};
