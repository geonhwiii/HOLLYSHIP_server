import { User } from './../models/User';
import { Post } from './../models/Post';
import { Router } from 'express';

const postRouter = Router();

/******************************************************************************
 * ?                      Get ALL Posts Info - "GET /post/"
 ******************************************************************************/
postRouter.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [{ model: User, attributes: ['email', 'username', 'userImage'] }]
  });
  return res.json(posts);
});

/******************************************************************************
 * ?                      Get Posts by id Info - "GET /post/:id"
 ******************************************************************************/
postRouter.get('/:id', async (req, res) => {
  const posts = Post.findByPk(req.params.id, {
    include: [{ model: User, attributes: ['email', 'username', 'userImage'] }]
  });
  return res.json(posts);
});

/******************************************************************************
 * ?                      POST Create Post - "POST /post"
 ******************************************************************************/
postRouter.post('/', async (req, res) => {
  try {
    const userId = req.session.passport.user;
    const { title, content } = req.body;
    const post = await Post.create({ userId, title, content });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?                      PUT Update Post - "PATCH /post/:id"
 ******************************************************************************/
postRouter.patch('/:id', async (req, res) => {
  try {
    const currentUserId = req.session.passport.user;
    const postUser = await Post.findOne({
      attributes: ['userId'],
      where: { id: req.params.id }
    });
    if (currentUserId !== postUser.userId) {
      return res.status(304).send('User Info not match!');
    }
    const { title, content } = req.body;
    const updatedPost = await Post.update(
      { title, content },
      { where: { id: req.params.id } }
    );
    res.send('POST UPDATED!');
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?                      PUT Delete Post - "DELETE /post/:id"
 ******************************************************************************/
postRouter.delete('/:id', async (req, res) => {
  try {
    const currentUserId = req.session.passport.user;
    const postUser = await Post.findOne({
      attributes: ['userId'],
      where: { id: req.params.id }
    });
    if (currentUserId !== postUser.userId) {
      return res.status(304).send('User not match');
    }
    await Post.destroy({ where: { id: req.params.id } });
    res.send('POST DELETED!');
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

export default postRouter;
