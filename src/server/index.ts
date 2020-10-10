import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import http from 'http';

import app from './app';
import config from '../../webpack.config';

import bodyParser from 'body-parser'
 
const clientOptions = {
  quiet: false,
  noInfo: false,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config[0].output.publicPath,
  stats: { colors: true },
  serverSideRender: true,
};

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, clientOptions));
app.use(webpackHotMiddleware(compiler));
app.use(webpackHotServerMiddleware(compiler, { chunkName: 'routes' }));
app.use(bodyParser.json())

const server = http.createServer(app);

server
  .listen(process.env.PORT || 3000, process.env.HOST || '0.0.0.0', () => {
    console.log(`🚧 server listening on ${server.address().address}:${server.address().port}`);
  })
  .on('error', (e) => console.log(e));
