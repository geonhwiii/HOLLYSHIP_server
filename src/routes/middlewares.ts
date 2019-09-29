import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import generateToken from '../lib/token';
const jwtSecret = process.env.JWT_SECRET;

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

// TODO: Verify Token middleware but, not use yet
export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    req.decoded = await jwt.verify(req.headers.authorization, jwtSecret);
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'TOKEN EXPIRED ERROR'
      });
    }
    return res.status(401).json({
      code: 401,
      message: 'INVALID TOKEN ERROR'
    });
  }
};
