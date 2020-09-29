import io from 'socket.io-client';
import request from 'superagent';
import { v1 as uuidV1 } from 'uuid';

import { createHash, hmacHex } from '../app/crypto';
import { createAoStore, Task } from '../app/store';

class AoApi {
  constructor(public socket) {}

  startSocketListeners() {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    this.socket.connect();
    this.socket.on('connect', () => {
      console.log('socket connected');

      const { session, token } = aoStore.state;

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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
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

  async prioritizeCard(
    taskId: string,
    inId: string,
    position: number = 0
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-prioritized',
      taskId: taskId,
      inId: inId,
      position: position
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async findOrCreateCardInCard(
    name: string,
    inId: string,
    prioritized: boolean = false
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    let found = aoStore.cardByName.get(name.toLowerCase())
    let act
    if (found) {
      if (prioritized) {
        return this.prioritizeCard(found.taskId, inId)
      } else {
        act = {
          type: 'task-sub-tasked',
          taskId: inId,
          subTask: found.taskId,
          memberId: aoStore.member.memberId
        }
      }
    } else {
      act = {
        type: 'task-created',
        name: name,
        color: 'blue',
        deck: [aoStore.member.memberId],
        inId: inId,
        prioritized: prioritized
      }
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async unpinCardFromGrid(
    x: number,
    y: number,
    inId: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'grid-unpin',
      x,
      y,
      inId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async refocusCard(taskId: string, inId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-refocused',
      taskId: taskId,
      inId: inId,
      blame: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async discardCardFromCard(
    taskId: string,
    inId: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-de-sub-tasked',
      taskId: inId,
      subTask: taskId,
      blame: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async pinCardToGrid(
    x: number,
    y: number,
    name: string,
    inId: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const task: Task = aoStore.cardByName.get(name.toLowerCase())
    if (_.isObject(task)) {
      const act = {
        type: 'grid-pin',
        taskId: task.taskId,
        x: x,
        y: y,
        inId: inId
      }
      return request
        .post('/events')
        .set('Authorization', aoStore.state.token)
        .send(act)
        .then(res => {
          return res
        })
    } else {
      const act = {
        type: 'task-created',
        name: name,
        color: 'blue',
        deck: [aoStore.member.memberId],
        inId: inId,
        prioritized: false
      }
      return request
        .post('/events')
        .set('Authorization', aoStore.state.token)
        .send(act)
        .then(res => {
          const taskId = JSON.parse(res.text).event.taskId
          const gridAct = {
            type: 'grid-pin',
            taskId: taskId,
            x: x,
            y: y,
            inId: inId
          }
          return request
            .post('/events')
            .set('Authorization', aoStore.state.token)
            .send(gridAct)
        })
    }
  }
  
  async addGridToCard(
    taskId: string,
    height: number,
    width: number
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'grid-added',
      taskId: taskId,
      height: height,
      width: width
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async resizeGrid(
    taskId: string,
    newHeight: number,
    newWidth: number
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'grid-resized',
      taskId: taskId,
      height: newHeight,
      width: newWidth
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async activateMember(memberId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'member-activated',
      memberId: memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async deactivateMember(memberId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'member-deactivated',
      memberId: memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async dropCard(taskId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-dropped',
      taskId: taskId,
      memberId: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  } 

  async grabCard(taskId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-grabbed',
      taskId: taskId,
      memberId: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async completeCard(taskId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-claimed',
      taskId: taskId,
      memberId: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async uncheckCard(taskId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)();
    const act = {
      type: 'task-unclaimed',
      taskId: taskId,
      memberId: aoStore.member.memberId
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
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
