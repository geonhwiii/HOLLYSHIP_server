import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';
const router = Router();

/******************************************************************************
 * ?                      CHECK GET SUCCESS - "GET /"
 ******************************************************************************/
router.get('/', (req: Request, res: Response) => {
  console.log(`[req.body]: ${req.body}`);
  res.send('SUCCESS GET');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
