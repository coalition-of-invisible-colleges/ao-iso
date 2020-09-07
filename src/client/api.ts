import io from 'socket.io-client';
import request from 'superagent';
import { v1 as uuidV1 } from 'uuid';

import { createHash, hmacHex } from '../app/crypto';
import store from '../app/store';

class AoApi {
  constructor(public socket) {}

  startSocketListeners() {
    const aoStore = store.store;
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('socket connected');

      const { session, token } = aoStore.state;

      console.log("Session and token: ", session, token);

      this.socket.emit('authentication', {
        session: session,
        token: token
      });
    });
    this.socket.on('authenticated', () => {
      console.log('authenticated')
      this.socket.on('eventstream', ev => {
        console.log('event', ev);
        aoStore.applyEvent(ev);
      });
    });
    this.socket.on('disconnect', reason => {
      console.log('disconnected');
      this.socket.connect();
    });
  }

  async createSession(user: string, pass: string): Promise<boolean> {
    const session = uuidV1();
    const sessionKey = createHash(session + createHash(pass));
    const token = hmacHex(session, sessionKey);
    return request
      .post('/session')
      .set('authorization', token)
      .set('session', session)
      .set('name', user)
      .on('error', () => false)
      .then(res => {
        aoStore.state.token = token;
        aoStore.state.session = session;
        aoStore.state.user = user;
        
        window.localStorage.setItem('user', user);
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('session', session);

        return true;
      });
  }
 
  async fetchState(): Promise<boolean> {
    const session = window.localStorage.getItem('session')
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')
    
    return request
      .post('/state')
      .set('Authorization', token)
      .set('session', session)
      .set('name', user)
      .then(res => {
        aoStore.state.session = session;
        aoStore.state.token = token;
        aoStore.state.user = user;
        aoStore.state.loggedIn = true;
          
        aoStore.initializeState(res.body);
        return true;
      })
      .catch(() => false);
  }
}

const socket = io.connect(
  '/',
  {
    autoConnect: false
  }
)
const api = new AoApi(socket);
export default api;
