import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';
import postRouter from './postRouter';
const router = Router();

/******************************************************************************
 * ?                      CHECK GET SUCCESS - "GET /"
 ******************************************************************************/
router.get('/', (req: Request, res: Response) => {
  res.send('SUCCESS GET');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/post', postRouter);

export default router;
