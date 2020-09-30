import React from 'react';
import { observable, computed, observe, action } from 'mobx';
import _ from 'lodash';
import { applyEvent, setCurrent } from './mutations';
import { blankCard } from './calculations'

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

export interface Grid {
  rows: {}
  height: number
  width: number
}

export interface Task {
  taskId: string
  color: string
  deck: string[]
  name: string
  address: string
  bolt11: string
  book: {
    memberId: string
    startTs: number
    endTs: number
  }
  boost: number
  priorities: string[]
  subTasks: string[]
  completed: string[]
  parents: string[]
  claimed: string[]
  passed: number[]
  guild: string
  lastClaimed: number
  completeValue: number
  payment_hash: string
  highlights: number[]
  seen: Userseen[]
  time: Usertime[]
  created: number
  grid?: Grid
}

export interface Meme {
  memeId: string
  filename: string
  hash: string
  filetype: string
}

export interface Resource {
  resourceId: string
  name: string
  charged: number
  secret: string
  trackStock: boolean
  stock: number
}

export interface ConnectedAo {
  address: string
  outboundSecret: false | string
  inboundSecret: string
  lastContact: number
  links: string[]
}

interface Usertime {
  memberId: string
  timelog: number[]
  date: Date[]
}

interface Userseen {
  memberId: string
  timestamp: Date
}

interface Output {
  value: number
}

interface Channel {
  channel_sat: number
}

export interface PublicState {
  ao: ConnectedAo[]
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
    outputs: Output[]
    channels: Channel[]
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

export interface SearchResults {
  missions: Task[]
  members: Task[]
  tasks: Task[]
  all: Task[]
  length: number
}

export const emptySearchResults = {
  missions: [],
  members: [],
  tasks: [],
  all: [],
  length: 0
}

export class AoStore {
  state: AoState = defaultState;
  @observable searchResults?: SearchResults = undefined
  @observable context: string[] = []
  @observable discard: Task[] = []
  @observable currentCard: string = undefined
  @observable guiCloseables: ((event?) => void)[] = []

  constructor(state: AoState) {
    console.log("Inializing state", state);
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

  @computed get memberCard(): Task {
    let memberCard = _.merge(
      blankCard('', '', '', ''),
      this.hashMap.get(this.member.memberId)
    )
    return memberCard
  }

  @computed get memeById(): Map<string, Meme> {
    let hashMap: Map<string, Meme> = new Map()
    this.state.memes.forEach(m => {
      hashMap.set(m.memeId, m)
    })
    return hashMap
  }

  @computed
  get myCards() {
    return this.state.tasks.filter(
      t => t.deck.indexOf(this.member.memberId) !== -1
    )
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
  resetState() {
    setCurrent(this.state, defaultState)
  }
  @action.bound
  updateSearchResults(query: string) {
    if (query.length < 1) {
      this.searchResults = undefined
      return
    }

    // for 1 letter search only first letter of guild names, 2 letters searches 1st word and also 1st initials of guild titles
    let foundCards: Task[] = []
    let foundGuilds: Task[] = []
    let foundMembers: Task[] = []
    let searchResults: Task[] = []

    try {
      let regex = new RegExp(query, 'i')
      this.state.tasks.forEach(t => {
        const testName = regex.test(t.name)
        if (t.guild && (testName || regex.test(t.guild))) {
          foundGuilds.push(t)
        } else if (regex.test(t.name)) {
          if (
            !foundGuilds.some(g => {
              return g.guild === t.name
            })
          ) {
            foundCards.push(t)
          }
        }
      })

      this.state.members.forEach(member => {
        if (regex.test(member.name)) {
          let result = this.hashMap.get(member.memberId)
          result.name = member.name
          foundMembers.push(result)
        }
      })
      this.searchResults = observable({
        missions: foundGuilds,
        members: foundMembers,
        tasks: foundCards,
        all: foundGuilds.concat(foundMembers, foundCards),
        length: foundGuilds.length + foundMembers.length + foundCards.length
      })
    } catch (err) {
      console.log('regex search terminated in error: ', err)
    }
  }
  @action.bound
  addToContext(taskIds: string[]) {
    if (taskIds.length < 1) return
    this.context = this.context.filter(tId => {
      return !taskIds.includes(tId)
    })
    this.context.push(...taskIds)
    if (this.context[0] !== this.member.memberId) {
      this.context = this.context.filter(tId => {
        return tId !== this.member.memberId
      })
      this.context.unshift(this.member.memberId)
    }
  }
  removeFromContext(taskId: string) {
    this.context = this.context.filter(tId => {
      return tId !== taskId
    })
  }
  @action.bound
  clearContextTo(taskId: string) {
    const index = this.context.findIndex(tId => {
      return tId === taskId
    })
    this.context = this.context.slice(0, index + 1)
  }
  @action.bound
  setCurrentCard(taskId: string) {
    this.currentCard = taskId
  }
  @action.bound
  addToDiscardHistory(tasks: Task[]) {
    if (tasks.length < 1) return
    this.discard.push(...tasks)
  }
  @action.bound
  popDiscardHistory() {
    return this.discard.pop()
  }
  @action.bound
  registerCloseable(onHide: (event) => void) {
    this.guiCloseables.push(onHide)
  }
  @action.bound
  unregisterCloseable(onHide: (event) => void) {
    this.guiCloseables = this.guiCloseables.filter(
      callback => callback !== onHide
    )
  }
  @action.bound
  closeAllCloseables() {
    this.guiCloseables.forEach(callback => callback())
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

let aoStore;

export function createAoStore(state) {
  if (aoStore == null) {
    console.log('creating store with state', state);
    aoStore = new AoStore(state)
  }
  return () => aoStore;
}

export type AOStore = ReturnType<typeof createAoStore>

export const StoreContext = React.createContext<AOStore | null>(null)

export const useStore = () => {
  const store = React.useContext(StoreContext)
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return store
}

export function withUseStore(Component) {
  return (props) => {
    const aoStore = useStore();
    return <Component {...props} aoStore={aoStore} />
  }
}