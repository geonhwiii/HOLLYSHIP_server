import { User } from './../models/User';
import { UserMusicsLike } from './../models/UserMusicsLike';
import { MusicPlayList } from './../models/MusicPlayList';
import { Musics } from './../models/Musics';

import { Router, Request, Response, NextFunction } from 'express';

const musicRouter = Router();

/******************************************************************************
 * ?                     GET ALL Music - "GET /music/"
 ******************************************************************************/
musicRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find All Music data with User Info
      const musicData = await Musics.findAll({
        attributes: [
          'id',
          'title',
          'thumbnail',
          'artist',
          'playTime',
          'genre',
          'youtubeUrl',
        ],
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'userImage'],
          },
        ],
      });
      res.json(musicData);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                     GET a Music - "GET /music/:id"
 ******************************************************************************/
musicRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Find a Music by id with User Info
      const musicData = await Musics.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'thumbnail', 'artist', 'playTime', 'genre', 'youtubeUrl'],
        include: [
          {
            model: User,
            attributes: ['id', 'username', 'userImage'],
          },
        ],
      });
      res.json(musicData);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?                     POST Music - "POST /music/"
 ******************************************************************************/
musicRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        id,
        title,
        thumbnail,
        artist,
        playTime,
        genre,
        youtubeUrl,
      } = req.body;
      // TODO: Create a Music
      const music = await Musics.create({
        id,
        title,
        thumbnail,
        artist,
        playTime,
        genre,
        youtubeUrl,
      });
      res.json({ message: 'MUSIC POST SUCCESS', music });
    } catch (err) {
      console.error(err);
      res.status(500).send('SERVER ERROR');
    }
  }
);

/******************************************************************************
 * ?           POST Add music in PlayList - "POST /music/:id/list"
 ******************************************************************************/
musicRouter.post(
  '/:id/list',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { playlistId } = req.body;
      // TODO: Add Music in Playlist
      const musicInList = await MusicPlayList.create({
        musicId: +req.params.id,
        playlistId,
      });
      res.json({ message: 'Add music in playlist', musicInList });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?           POST Like music - "POST /music/:id/like"
 ******************************************************************************/
musicRouter.post(
  '/:id/like',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.passport.user;
      const musicId = +req.params.id;
      // TODO:
      const exLike = await UserMusicsLike.findOne({
        where: { userId, musicId },
      });
      if (exLike) {
        return res.status(409).json({ message: 'Cannot like more than 1' });
      }
      // TODO: Like (Create UserMusicsLike by user id and music id)
      const like = await UserMusicsLike.create({ userId, musicId });
      res.json({ message: 'MUSIC LIKE!', like });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

/******************************************************************************
 * ?           DELETE Like music - "DELETE /music/:id/like"
 ******************************************************************************/
musicRouter.delete(
  '/:id/like',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.session.passport.user;
      const musicId = req.params.id;
      // TODO: Unlike ( Delete UserMusicsLike by user id and music id )
      await UserMusicsLike.destroy({ where: { userId, musicId } });
      res.json({ message: 'UNLIKE MUSIC!' });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default musicRouter;
