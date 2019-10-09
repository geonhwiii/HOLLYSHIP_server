import { MusicPlayList } from './../models/MusicPlayList';
import { Musics } from './../models/Musics';
import { PlayList } from './../models/PlayList';
import { Router, Request, Response } from 'express';

const playListRouter = Router();

/******************************************************************************
 * ?                   GET ALL PlayList - "GET /list/"
 ******************************************************************************/
playListRouter.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.session.passport.user;
    const lists = await PlayList.findAll({
      where: { userId },
      attributes: ['id', 'listName'],
    });
    res.json(lists);
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?          GET musics in playlist  - "GET /list/:id/music"
 ******************************************************************************/
playListRouter.get('/:id/music', async (req: Request, res: Response) => {
  try {
    const userId = req.session.passport.user;
    const listId = req.params.id;
    const musics = await PlayList.findAll({
      where: { id: listId, userId },
      include: [
        {
          model: Musics,
          attributes: [
            'id',
            'title',
            'thumbnail',
            'artist',
            'playTime',
            'genre',
            'youtubeUrl',
          ],
        },
      ],
    });
    res.json(musics);
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?                     POST Add PlayList - "POST /list/add"
 ******************************************************************************/
playListRouter.post('/add', async (req: Request, res: Response) => {
  try {
    const userId = req.session.passport.user;
    const { listName } = req.body;
    if (!listName) {
      return res.status(409).json({ message: 'Should post listName!' });
    }
    const list = await PlayList.create({ userId, listName });
    res.json({ message: 'Add a playlist', list });
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?               DELETE Delete a music in PlayList - "DELETE /list/:id/music"
 ******************************************************************************/
playListRouter.delete('/:id/music', async (req: Request, res: Response) => {
  try {
    const playlistId = req.params.id;
    const musicId = req.body;
    const music = await MusicPlayList.destroy({
      where: { musicId, playlistId },
    });
    if (!music) {
      return res.status(409).json({ message: 'UNDEFINED MUSIC' });
    }
    return res.json({ message: 'MUSIC DELETED FROM LIST!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

/******************************************************************************
 * ?               DELETE Delete a PlayList - "DELETE /list/:id"
 ******************************************************************************/
playListRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.session.passport.user;
    const exList = await PlayList.findOne({
      where: { id: req.params.id, userId },
    });
    if (!exList) {
      return res.status(409).json({ message: 'Undefined list' });
    }
    await PlayList.destroy({
      where: { id: req.params.id, userId },
    });
    res.json({ message: 'LIST DELETED!' });
  } catch (err) {
    console.error(err);
    res.status(500).send('SERVER ERROR');
  }
});

export default playListRouter;
