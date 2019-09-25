import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';
import postRouter from './postRouter';
import emotionRouter from './emotionRouter';
import musicRouter from './musicRouter';
import playListRouter from './playListRouter';
import followRouter from './followRouter';
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
router.use('/emoji', emotionRouter);
router.use('/music', musicRouter);
router.use('/list', playListRouter);
router.use('/follow', followRouter);

export default router;
