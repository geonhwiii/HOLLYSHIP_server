import { Router, Request, Response, NextFunction } from 'express';
import querystring from 'query-string';
import request from 'request';

const spotifyRouter = Router();

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_SECRET; // Your secret
const redirect_uri = 'http://localhost:8000/spotify/callback'; // Your redirect uri
const stateKey = 'spotify_auth_state';

// TODO: Make Random String
const generateRandomString = (length: number) => {
  let text: string = '';
  const possible: string =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// TODO: Login to Spotify ( GET: /spotify/login )
spotifyRouter.get(
  '/login',
  (req: Request, res: Response, next: NextFunction) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    // TODO: Application requests authorization
    // ? if success, it will be redirected to /spotify/callback
    const scope = 'user-read-private user-read-email';
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state
      })}`
    );
  }
);

spotifyRouter.get('/callback', (req: Request, res: Response) => {
  // TODO: Application requests access_tokens & refresh_token after checking the state parameter

  // TODO: Required parameters
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;
  const clientInfo = `${client_id}:${client_secret}`;

  if (state === null || state !== storedState) {
    // res.redirect(`/${querystring.stringify({ error: 'state_mismatch' })}`);
    res.status(403).json({ message: 'state_mismatch' });
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        Authorization: `Basic ${new Buffer(clientInfo).toString('base64')}`
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;
        res.json({ access_token, refresh_token });
        // const options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { Authorization: `Bearer ${access_token}` },
        //   json: true
        // };

        // // use the access token to access the Spotify Web API
        // request.get(options, (error, response, body) => {
        //   console.log(body);
        // });

        // // we can also pass the token to the browser to make requests from there
        // res.redirect(
        //   `/${querystring.stringify({
        //     access_token,
        //     refresh_token
        //   })}`
        // );
      } else {
        // res.redirect(
        //   `/${querystring.stringify({
        //     error: 'invalid_token'
        //   })}`
        // );
        res.status(403).json({ message: 'invalid_token' });
      }
    });
  }
});

// TODO: Send refresh_token
spotifyRouter.get('/refresh_token', (req: Request, res: Response) => {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const clientInfo = `${client_id}:${client_secret}`;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer(clientInfo).toString('base64')}`
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token
      });
    }
  });
});

export default spotifyRouter;
