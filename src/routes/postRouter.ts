import { UserPostLike } from './../models/UserPostLike';
import { Comment } from './../models/Comment';
import { User } from './../models/User';
import { Post } from './../models/Post';
import { Router } from 'express';

const postRouter = Router();

/******************************************************************************
 * ?                      Get ALL Posts Info - "GET /post/"
 ******************************************************************************/
postRouter.get('/', async (req, res) => {
  try {
    // TODO: Find all Post with User & Comment data
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['email', 'username', 'userImage'],
        },
        { model: Comment, attributes: ['comment', 'commentUsername'] },
        {
          model: UserPostLike,
          attributes: ['id', 'userId'],
          include: [{ model: User, attributes: ['email', 'username'] }],
        },
      ],
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      Get Posts by id Info - "GET /post/:id"
 ******************************************************************************/
postRouter.get('/:id', async (req, res) => {
  try {
    // TODO: Find a Post with User & Comment data
    const posts = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['email', 'username', 'userImage'],
        },
        { model: Comment, attributes: ['comment', 'commentUsername'] },
        {
          model: UserPostLike,
          attributes: ['id', 'userId'],
          include: [{ model: User, attributes: ['email', 'username'] }],
        },
      ],
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      Get Posts by userId - "GET /post/:id/user"
 ******************************************************************************/
postRouter.get('/:userId/user', async (req, res) => {
  try {
    // TODO: Find a Post with User & Comment data
    const posts = await Post.findOne({
      where: { userId: +req.params.userId },
      include: [
        {
          model: User,
          attributes: ['email', 'username', 'userImage'],
        },
        {
          model: UserPostLike,
          attributes: ['id', 'userId'],
          include: [{ model: User, attributes: ['email', 'username'] }],
        },
      ],
    });
    return res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      POST Create Post - "POST /post"
 ******************************************************************************/
postRouter.post('/', async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const { title, content, emotion } = req.body;
    if (!title || !content || !emotion) {
      return res
        .status(409)
        .json({ message: "title & content & emotion can't be null!" });
    }
    // TODO: Create Post table
    const post = await Post.create({ userId, title, content, emotion });
    return res.json({ message: 'CREATE POST SUCCESS', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      POST Like Post - "POST /post/:id/like"
 ******************************************************************************/
postRouter.post('/:id/like', async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const postId = +req.params.id;
    // TODO: Find Post by userId
    const postUser = await Post.findOne({
      attributes: ['userId'],
      where: { id: postId },
    });
    // TODO: Check Current Login User is equal with PostUser
    if (userId !== postUser.userId) {
      return res.status(409).json({ message: 'User not match' });
    }
    // TODO: Prevent Like more than 1
    const exUser = await UserPostLike.findOne({ where: { userId, postId } });
    if (exUser) {
      return res.status(409).json({ message: 'Cannot like more than 1!' });
    }
    // TODO: Create Post table
    const post = await UserPostLike.create({ userId, postId });
    return res.json({ message: 'LIKE POST!', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      PUT Update Post - "PATCH /post/:id"
 ******************************************************************************/
postRouter.patch('/:id', async (req, res) => {
  try {
    const currentUserId = req.session.passport.user;
    // TODO: Find Post by userId
    const postUser = await Post.findOne({
      attributes: ['userId'],
      where: { id: req.params.id },
    });
    if (currentUserId !== postUser.userId) {
      return res.status(409).send('User Info not match!');
    }
    const { title, content, emotion } = req.body;
    // TODO: Update Post
    const updatedPost = await Post.update(
      { title, content, emotion },
      { where: { id: req.params.id } }
    );
    return res.json({ message: 'POST UPDATED!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      PUT Delete Post - "DELETE /post/:id"
 ******************************************************************************/
postRouter.delete('/:id', async (req, res) => {
  try {
    const currentUserId = req.session.passport.user;
    // TODO: Find Post by userId
    const postUser = await Post.findOne({
      attributes: ['userId'],
      where: { id: req.params.id },
    });
    // TODO: Check Current Login User is equal with PostUser
    if (currentUserId !== postUser.userId) {
      return res.status(409).send('User not match');
    }
    // TODO: Delete Post
    await Post.destroy({ where: { id: req.params.id } });
    res.json({ message: 'POST DELETED!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

/******************************************************************************
 * ?                      DELETE UnLike Post - "DELETE /post/:id/like"
 ******************************************************************************/
postRouter.delete('/:id/like', async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const postId = req.params.id;
    // TODO: DELETE UserPostLike table
    const post = await UserPostLike.destroy({ where: { userId, postId } });
    if (!post) {
      return res.status(403).json({ message: 'Undefined like in Post' });
    }
    return res.json({ message: 'UNLIKE POST!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'SERVER ERROR' });
  }
});

export default postRouter;
