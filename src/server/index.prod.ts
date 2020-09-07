import { Request, Response, NextFunction } from 'express';
import http from 'http';
import Server from 'socket.io';
import app from './app';
import routes from './routes';

const server = http.createServer(app);
const io = new Server(server);

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send('INTERNAL SERVER ERROR');
});

io.on('connection', (socket) => {
  console.log(`🚧 socket.io connected on port : ${process.env.PORT || 3000}`);
});

server
  .listen(process.env.PORT || 3000, () => {
    console.log(`🚧 server listening on port : ${process.env.PORT || 3000}`);
  })
  .on('error', (e) => console.log(e));
