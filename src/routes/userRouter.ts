import { UserPostLike } from './../models/UserPostLike';
import { Post } from './../models/Post';
import { Musics } from './../models/Musics';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import multer from 'multer';
import path from 'path';

const userRouter = Router();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});
const upload2 = multer();

/******************************************************************************
 * ?                      Get ALL User Info - "GET /user"
 ******************************************************************************/
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Find All User Info with Like Musics
    const users = await User.findAll({
      include: [
        {
          model: Musics,
          attributes: ['id', 'title', 'thumbnail', 'artist'],
        },
        {
          model: UserPostLike,
          attributes: ['id', 'postId'],
          include: [{ model: Post, attributes: ['title'] }],
        },
      ],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/******************************************************************************
 * ?                     GET User Info - "GET /user/:id"
 ******************************************************************************/
userRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find a User Info with Like Musics
      const user = await User.findByPk(req.params.id, {
        include: [
          { model: Musics, attributes: ['id', 'title', 'thumbnail', 'artist'] },
          {
            model: UserPostLike,
            attributes: ['id', 'postId'],
            include: [{ model: Post, attributes: ['title'] }],
          },
        ],
      });
      res.json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                     POST Upload User Image - "POST /user/img"
 ******************************************************************************/
userRouter.post(
  '/img',
  upload.single('img'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Upload Image
      res.json({ userImage: `/img/${req.file.filename}` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                     PATCH Update User Info - "PATCH /user/:id"
 ******************************************************************************/
userRouter.patch(
  '/:id',
  upload2.none(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find a User Info
      const user = await User.findByPk(req.params.id);
      const { nickname, userImage, intro } = req.body;
      await User.update({ userImage, intro }, { where: { id: user.id } });
      res.json({ message: 'UPDATE SUCCESS', user });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default userRouter;
