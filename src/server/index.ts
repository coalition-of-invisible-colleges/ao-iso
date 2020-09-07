import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';
import http from 'http';

import app from './app';
import config from '../../webpack.config';
 
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

const server = http.createServer(app);

server
  .listen(process.env.PORT || 3000, () => {
    console.log(`🚧 server listening on port : ${process.env.PORT || 3000}`);
  })
  .on('error', (e) => console.log(e));
