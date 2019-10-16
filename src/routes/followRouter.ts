import { User } from './../models/User';
import { Follow } from './../models/Follow';
import { Router, Request, Response, NextFunction } from 'express';

const followRouter = Router();

/******************************************************************************
 * ?                      GET ALL follow Info - "GET /follow"
 ******************************************************************************/
followRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const follows = await Follow.findAll({
        attributes: ['id', 'followerName', 'followingName']
      });
      res.json(follows);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?   GET My follow Info - "GET /follow/following" - 내가 follow하고 있는 User
 ******************************************************************************/
followRouter.get(
  '/following',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followerId = req.session.passport.user;
      const follows = await Follow.findAll({
        where: { followerId },
        attributes: ['id', 'followingName']
      });
      res.json(follows);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ? GET get my follower Info - "GET /follow/follower" - 나를 follow하고 있는 User
 ******************************************************************************/
followRouter.get(
  '/follower',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.passport.user;
      const follows = await Follow.findAll({
        where: { followingId: userId },
        attributes: ['id', 'followerName', 'followingName']
      });
      res.json(follows);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);
// TODO: 자기가 자기를 follow하는 것 방지, id로 선택하는게아닌 username으로 선택할 수 있도록 변경
/******************************************************************************
 * ?          POST make following to follower - "POST /follow/add"
 ******************************************************************************/
followRouter.post(
  '/add',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followerId = req.session.passport.user;
      // TODO: Find current Login User Name
      const currentUser = await User.findOne({
        where: { id: followerId },
        attributes: ['username']
      });
      const followerName = currentUser.username;
      // TODO: Find following User Info
      const followingUser = await User.findOne({
        where: { username: req.body.username },
        attributes: ['id', 'username']
      });
      const followingId = followingUser.id;
      const followingName = followingUser.username;
      // TODO: Check follow self
      if (followerId === followingId) {
        res.status(409).json({ message: 'Cannot follow self!' });
        return;
      }
      // TODO: Check already following
      const exitUser = await Follow.findOne({
        where: { followerId, followingId }
      });
      if (exitUser) {
        res.status(409).json({ message: 'You already following' });
        return;
      }
      const follow = await Follow.create({
        followerId,
        followingId,
        followerName,
        followingName
      });
      res.json({
        message: `Follow ${followingName}`,
        follow
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?          DELETE delete following - "DELETE /follow"
 ******************************************************************************/
followRouter.delete(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followerId = req.session.passport.user;
      const followUser = req.body.username;
      // TODO: Find following UserId
      const user = await User.findOne({
        where: { username: followUser },
        attributes: ['id']
      });
      if (!user) {
        res.status(409).json({ message: 'Already unfollowed!' });
        return;
      }
      const followingId = user.id;
      // TODO: Unfollow user
      await Follow.destroy({
        where: { followerId, followingId }
      });
      res.json({
        message: `Unfollow User ${followUser}`
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default followRouter;
