import { Musics } from './../models/Musics';
import { Router, Request, Response } from 'express';

const musicRouter = Router();

/******************************************************************************
 * ?                     GET ALL Music - "GET /music/"
 ******************************************************************************/
musicRouter.get('/', async (req: Request, res: Response) => {
  try {
    const musicData = await Musics.findAll({
      attributes: ['id', 'title', 'thumbnail', 'artist', 'playTime', 'genre']
    });
    res.json(musicData);
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?                     GET a Music - "GET /music/:id"
 ******************************************************************************/
musicRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const musicData = await Musics.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'thumbnail', 'artist', 'playTime', 'genre']
    });
    res.json(musicData);
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?                     POST Music - "POST /music/"
 ******************************************************************************/
musicRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { title, thumbnail, artist, playTime, genre, youtubeUrl } = req.body;
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
});

export default musicRouter;
