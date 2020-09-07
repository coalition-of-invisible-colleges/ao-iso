import { observable, computed, observe, action } from 'mobx';
import _ from 'lodash';
import { applyEvent, setCurrent } from './mutations';

export interface Session {
  type: 'session-created'
  session: string
  ownerId: string
  timestamp: Date
}

export interface Member {
  type: 'member-created'
  name: string
  secret: string
  memberId: string
  address: string
  active: number
  balance: number
  badges: []
  tickers: string[]
  info: {}
  timestamp: number
  lastUsed: Date
  muted: Boolean
}

export interface Grid {}

export interface Task {}

export interface Meme {}

export interface PublicState {
  ao: number[]
  sessions: Session[]
  members: Member[]
  tasks: Task[]
  resources: []
  memes: Meme[]
  cash: {
    address: string
    alias: string
    currency: string
    spot: number
    rent: number
    cap: number
    pay_index: number
    usedTxIds: number[]
    outputs: number[]
    channels: number[]
    info: {}
  }
}

export const serverState: PublicState = {
  ao: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  memes: [],
  cash: {
    address: '',
    alias: '',
    currency: 'CAD',
    spot: 0,
    rent: 0,
    cap: 75,
    pay_index: 0,
    usedTxIds: [],
    outputs: [],
    channels: [],
    info: {}
  }
};

export const pubState: PublicState = {
  ao: [],
  sessions: [],
  members: [],
  tasks: [],
  resources: [],
  memes: [],
  cash: {
    address: '',
    alias: '',
    currency: 'CAD',
    spot: 0,
    rent: 0,
    cap: 75,
    pay_index: 0,
    usedTxIds: [],
    outputs: [],
    channels: [],
    info: {}
  }
};

export interface AoState extends PublicState {
  session: string
  token: string
  loggedIn: boolean
  user: string
}

const defaultState: AoState = {
  session: '',
  token: '',
  user: '',
  loggedIn: false,
  ...pubState
};

export class AoStore {
  state: AoState = defaultState;

  constructor(state: AoState) {
    this.state = observable(state);
  }

  @computed get member(): Member {
    let loggedInMember: Member
    this.state.sessions.forEach(session => {
      if (this.state.session === session.session) {
        console.log('found existing session')
        const memberId = session.ownerId
        this.state.members.forEach(m => {
          if (m.memberId === memberId) {
            loggedInMember = m
          }
        })
      }
    })
    return loggedInMember
  }

  @computed get memberById(): Map<string, Member> {
    let hashMap: Map<string, Member> = new Map()
    this.state.members.forEach(m => {
      hashMap.set(m.memberId, m)
    })
    return hashMap
  }
  
  @computed get hashMap(): Map<string, Task> {
    let hashMap: Map<string, Task> = new Map()
    this.state.tasks.forEach(t => {
      hashMap.set(t.taskId, t)
    })
    return hashMap
  }

  @action.bound
  initializeState(state: AoState) {
    Object.keys(state).forEach(key => Object.assign(this.state[key], state[key]));
  }
  
  @action.bound
  applyEvent(ev) {
    applyEvent(this.state, ev);
  }

  @action.bound
  setCurrentCard(taskId: string) {
    this.currentCard = taskId
  }
}

export function applyBackup(backup) {
  console.log("backup:", backup)
  let server = Object.assign({}, backup);
  setCurrent(serverState, server);
  backup.memes = backup.memes && backup.memes.length > 0 ? backup.memes.map(removeSensitive) : [];
  backup.resources = backup.resources.map(removeSensitive);
  backup.members = backup.members.map(removeSensitive);
  backup.ao = backup.ao.map(removeSensitive);
  backup.tasks = backup.tasks.map(removeSensitive);
  setCurrent(pubState, backup);
}

export function removeSensitive(value) {
  let secretStuff = [
    'fob',
    'secret',
    'token',
    'email',
    'payment_hash',
    'inboundSecret',
    'outboundSecret'
  ]
  if (value.type === 'member-field-updated') {
    ['fob', 'secret', 'email'].forEach(str => {
      if (value.field === str) {
        secretStuff.push('newfield')
      }
    })
  }
  return _.omit(value, secretStuff)
}

const aoStore = {};

export default aoStore;

export function createAoStore(state) {
  aoStore.store = new AoStore(state);
}