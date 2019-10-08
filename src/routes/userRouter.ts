import { Follow } from './../models/Follow';
import { UserPostLike } from './../models/UserPostLike';
import { Post } from './../models/Post';
import { Musics } from './../models/Musics';
import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const userRouter = Router();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    acl: 'public-read-write',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
  }),
});

const upload2 = multer();

/******************************************************************************
 * ?                      Get My Info - "GET /user"
 ******************************************************************************/
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Find All User Info with Like Musics
    const userId = req.session.passport.user;
    const users = await User.findOne({
      where: { id: userId },
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
 * ?                     POST Upload User Image - "POST /user/upload"
 ******************************************************************************/
userRouter.post(
  '/upload',
  upload.single('photo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Upload Image
      res.json({ message: `/img/${req.file}` });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                     PATCH Update User Info - "PATCH /user/"
 ******************************************************************************/
userRouter.patch(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find a User Info
      const userId = req.session.passport.user;
      const { userImage } = req.body;
      const updateUser = await User.update(
        { userImage },
        { where: { id: userId } }
      );
      res.json({ message: 'UPDATE USER IMAGE SUCCESS' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default userRouter;
