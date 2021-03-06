import io from 'socket.io-client'
import request from 'superagent'
import { v1 as uuidV1 } from 'uuid'

import { createHash, hmacHex } from '../app/crypto'
import { createAoStore, Task } from '../app/store'

class AoApi {
  constructor(public socket) {}

  startSocketListeners() {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    this.socket.connect()
    this.socket.on('connect', () => {
      console.log('socket connected')

      const { session, token } = aoStore.state

      this.socket.emit('authentication', {
        session: session,
        token: token,
      })
    })
    this.socket.on('authenticated', () => {
      console.log('authenticated')
      this.socket.on('eventstream', ev => {
        console.log('event', ev)
        aoStore.applyEvent(ev)
      })
    })
    this.socket.on('disconnect', reason => {
      console.log('disconnected')
      this.socket.connect()
    })
  }

  async createSession(user: string, pass: string): Promise<boolean> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const session = uuidV1()
    const sessionKey = createHash(session + createHash(pass))
    const token = hmacHex(session, sessionKey)
    return request
      .post('/session')
      .set('authorization', token)
      .set('session', session)
      .set('name', user)
      .on('error', () => false)
      .then(res => {
        window.localStorage.setItem('user', user)
        window.localStorage.setItem('token', token)
        window.localStorage.setItem('session', session)
      })
  }

  logout() {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    aoStore.resetState()
    window.localStorage.clear()
  }

  async fetchState(): Promise<boolean> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const session = window.localStorage.getItem('session')
    const token = window.localStorage.getItem('token')
    const user = window.localStorage.getItem('user')

    return request
      .post('/state')
      .set('Authorization', token)
      .set('session', session)
      .set('name', user)
      .then(res => {
        aoStore.initializeState({
          ...res.body,
          session: session,
          token: token,
          user: user,
          loggedIn: true,
        })
        return true
      })
      .catch(() => false)
  }

  async nameAo(newName: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'ao-named',
      alias: newName,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async bark(): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'doge-barked',
      memberId: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async mute(): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'doge-muted',
      memberId: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async unmute(): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'doge-unmuted',
      memberId: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }
  async createCard(name: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-created',
      name: name,
      color: 'blue',
      deck: [aoStore.member.memberId],
      inId: aoStore.memberCard.taskId,
      prioritized: false,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
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
          memberId: aoStore.member.memberId,
        }
      }
    } else {
      act = {
        type: 'task-created',
        name: name,
        color: 'blue',
        deck: [aoStore.member.memberId],
        inId: inId,
        prioritized: prioritized,
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

  async prioritizeCard(
    taskId: string,
    inId: string,
    position: number = 0
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-prioritized',
      taskId: taskId,
      inId: inId,
      position: position,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'grid-unpin',
      x,
      y,
      inId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-refocused',
      taskId: taskId,
      inId: inId,
      blame: aoStore.member.memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-de-sub-tasked',
      taskId: inId,
      subTask: taskId,
      blame: aoStore.member.memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const task: Task = aoStore.cardByName.get(name.toLowerCase())
    if (_.isObject(task)) {
      const act = {
        type: 'grid-pin',
        taskId: task.taskId,
        x: x,
        y: y,
        inId: inId,
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
        prioritized: false,
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
            inId: inId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'grid-added',
      taskId: taskId,
      height: height,
      width: width,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'grid-resized',
      taskId: taskId,
      height: newHeight,
      width: newWidth,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'member-activated',
      memberId: memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'member-deactivated',
      memberId: memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async updateMemberField(
    field: string,
    newValue: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const secret = createHash(name)
    if (field === 'secret') {
      newValue = createHash(newValue)
    }
    const act = {
      type: 'member-field-updated',
      memberId: aoStore.member.memberId,
      field: field,
      newfield: newValue,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-dropped',
      taskId: taskId,
      memberId: aoStore.member.memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-grabbed',
      taskId: taskId,
      memberId: aoStore.member.memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-claimed',
      taskId: taskId,
      memberId: aoStore.member.memberId,
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
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-unclaimed',
      taskId: taskId,
      memberId: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async createResource(
    resourceId: string,
    name: string,
    charged: number,
    secret: string,
    trackStock: boolean
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'resource-created',
      resourceId: resourceId,
      name: name,
      charged: charged,
      secret: secret,
      trackStock: trackStock,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async useResource(
    resourceId: string,
    amount: number,
    charged: number,
    notes: string = ''
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'resource-used',
      resourceId: resourceId,
      memberId: aoStore.member.memberId,
      amount: amount,
      charged: charged,
      notes: notes,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async stockResource(
    resourceId: string,
    amount: number,
    paid: number,
    notes: string = ''
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'resource-stocked',
      resourceId: resourceId,
      memberId: aoStore.member.memberId,
      amount: amount,
      paid: paid,
      notes: notes,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async purgeResource(resourceId: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'resource-purged',
      resourceId: resourceId,
      blame: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async bookResource(
    taskId: string,
    startTime: number,
    endTime: number
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'resource-booked',
      resourceId: taskId,
      memberId: aoStore.member.memberId,
      startTs: startTime,
      endTs: endTime,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  // Each member has a list of tickers. Each ticker is a string.
  // Sets the ticker at position tickerListIndex to symbol coinSymbol.
  async setTicker(
    coinSymbol: string,
    tickerListIndex: number
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'member-ticker-set',
      memberId: aoStore.member.memberId,
      symbol: coinSymbol,
      index: tickerListIndex,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async clockTime(seconds, taskId, date): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-time-clocked',
      taskId: taskId,
      memberId: aoStore.member.memberId,
      seconds: seconds,
      date: date,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async valueCard(taskId: string, value: number): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-valued',
      taskId: taskId,
      value: value,
      blame: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async passCard(
    taskId: string,
    toMemberId: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-passed',
      taskId: taskId,
      toMemberId: toMemberId,
      fromMemberId: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async titleMissionCard(
    taskId: string,
    newTitle: string
  ): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-guilded',
      taskId: taskId,
      guild: newTitle,
      blame: aoStore.member.memberId,
    }
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async markSeen(taskId): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const task: Task = aoStore.hashMap.get(taskId)
    const act = {
      type: 'task-seen',
      taskId: task.taskId,
      memberId: aoStore.member.memberId,
    }
    console.log('card marked seen')
    return request
      .post('/events')
      .set('Authorization', aoStore.state.token)
      .send(act)
      .then(res => {
        return res
      })
  }

  async colorCard(taskId: string, color: string): Promise<request.Response> {
    const aoStore = createAoStore(window.__PRELOADED_STATE__)()
    const act = {
      type: 'task-colored',
      taskId: taskId,
      color: color,
      inId: null, // add this when we have context, mutation works on server
      blame: aoStore.member.memberId,
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

const socket = io.connect('/', {
  autoConnect: false,
})
const api = new AoApi(socket)
export default api
