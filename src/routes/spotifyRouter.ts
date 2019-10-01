import { Router, Request, Response } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyRouter = Router();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

// TODO: Generate Token
const getToken = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    // TODO: Save Token to spotifyAPI
    await spotifyApi.setAccessToken(data.body['access_token']);
    return await spotifyApi.getAccessToken();
  } catch (err) {
    console.error(err.message);
  }
};

// TODO: Read Token
const readToken = async () => {
  try {
    const token = await spotifyApi.getAccessToken();
    return token;
  } catch (err) {
    console.error(err.message);
  }
};

spotifyRouter.get('/', async (req: Request, res: Response) => {
  try {
    const token = await getToken();
    res.json({ message: 'SUCCESS', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Undefined Token' });
  }
});

export default spotifyRouter;
