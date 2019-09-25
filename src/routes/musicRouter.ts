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
      const musicData = await Musics.findAll({
        attributes: ['id', 'title', 'thumbnail', 'artist', 'playTime', 'genre']
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
      const musicData = await Musics.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'title', 'thumbnail', 'artist', 'playTime', 'genre']
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
        title,
        thumbnail,
        artist,
        playTime,
        genre,
        youtubeUrl
      } = req.body;
      const music = await Musics.create({
        title,
        thumbnail,
        artist,
        playTime,
        genre,
        youtubeUrl
      });
      res.json(music);
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
      const musicInList = await MusicPlayList.create({
        musicId: req.params.id,
        playlistId
      });
      res.json(musicInList);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

export default musicRouter;
