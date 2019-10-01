import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
import authRouter from './authRouter';
import postRouter from './postRouter';
import emotionRouter from './emotionRouter';
import musicRouter from './musicRouter';
import playListRouter from './playListRouter';
import followRouter from './followRouter';
import commentRouter from './commentRouter';
import spotifyRouter from './spotifyRouter';
const router = Router();

/******************************************************************************
 * ?                      CHECK GET SUCCESS - "GET /"
 ******************************************************************************/
router.get('/', (req: Request, res: Response) => {
  res.send('<h1>WELCOME TO THE HOLLSHIP!! DJ DROP THE BEAT!</h1>');
});

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/emoji', emotionRouter);
router.use('/music', musicRouter);
router.use('/list', playListRouter);
router.use('/follow', followRouter);
router.use('/comment', commentRouter);
router.use('/token', spotifyRouter);

export default router;
