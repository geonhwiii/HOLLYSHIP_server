import app from './app';

// TODO: Server listen
const server = app.listen(app.get('port'), () => {
  console.log(
    'Server is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  );
  console.log('Press CTRL-C to stop\n');
});

export default server;
