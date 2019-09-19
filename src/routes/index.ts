import { Router, Request, Response } from 'express';
import userRouter from './userRouter';
const router = Router();

/******************************************************************************
 * ?                      Check GET SUCCESS - "GET /api"
 ******************************************************************************/
router.get('/', (req: Request, res: Response) => {
  console.log(`[req.body]: ${req.body}`);
  res.send('SUCCESS GET');
});

router.use('/user', userRouter);

export default router;
