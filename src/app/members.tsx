import * as React from 'react'
import { observer } from 'mobx-react'
import { AOStore, withUseStore, Task } from './store'
import api from '../client/api'
import AoStack from './stack'

type MemberSort = 'alphabetical' | 'recents' | 'vouches' | 'age'

interface Props {
  aoStore: aoStore
}

interface State {
  sort: MemberSort
  page: number
  text?: string
}

export const defaultState: State = {
  sort: 'recents',
  page: 0
}

@observer
class AoMembers extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.sortBy = this.sortBy.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  sortBy(sort: MemberSort) {
    if (this.state.sort === sort) {
      return
    }
    this.setState({ sort: sort })
  }

  onChange(event) {
    this.setState({ text: event.target.value })
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.onClick(event)
    }
  }
  onClick(event) {
    api.createMember(this.state.text)
  }

  renderSortButton(sort: MemberSort, label: string) {
    if (this.state.sort === sort) {
      return <p className={'action selected'}>{label}</p>
    } else {
      return (
        <p onClick={() => this.sortBy(sort)} className={'action'}>
          {label}
        </p>
      )
    }
  }

  render() {
    const members = this.props.aoStore.state.members.slice()
    let memberCards: Task[] = []

    if (this.state.sort === 'recents') {
      members.sort((a, b) => {
        return a.lastUsed < b.lastUsed ? -1 : 1
      })
    } else if (this.state.sort === 'alphabetical') {
      members.sort((a, b) => {
        return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      })
    }

    memberCards = members
      .map(member => this.props.aoStore.hashMap.get(member.memberId))
      .slice()

    if (this.state.sort === 'vouches') {
      memberCards.sort((a, b) => {
        return a.deck.length - b.deck.length
      })
    } else if (this.state.sort === 'age') {
      memberCards.reverse()
      // Default sort is database order, i.e., member creation order
    }

    let list
    if (memberCards && memberCards.length >= 1) {
      list = (
        <AoStack
          cards={memberCards}
          zone={'panel'}
          cardStyle={'priority'}
          cardsBeforeFold={10}
        />
      )
    }

    return (
      <React.Fragment>
        <h2>Members</h2>
        <div className={'toolbar'}>
          {this.renderSortButton('alphabetical', 'A-Z')}
          {this.renderSortButton('recents', 'Recents')}
          {this.renderSortButton('vouches', 'Vouches')}
          {this.renderSortButton('age', 'Order')}
        </div>
        {list}
        <div>
          New Member:
          <input
            type="text"
            value={this.state.text}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
          />
          <button type="button" onClick={this.onClick}>
            Add Member
          </button>
        </div>
      </React.Fragment>
    )
  }
}

export default withUseStore(AoMembers)