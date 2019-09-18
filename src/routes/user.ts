import { Router, Request, Response } from 'express';
const router = Router();

/******************************************************************************
 *                      Get User Info - "GET /api/user"
 ******************************************************************************/

router.get('/user', (req: Request, res: Response) => {
  res.send('DO YOU WANT GET USER INFO?');
});

export default router;
