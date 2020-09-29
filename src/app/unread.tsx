import React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { withUseStore } from './store'

interface UnreadProps {
  taskId: string
}

@observer
class AoUnread extends React.PureComponent<UnreadProps> {
  @computed
  get seen() {
    const card = this.props.aoStore.hashMap.get(this.props.taskId)
    return this.props.aoStore.state.tasks.filter(
      t => t.deck.indexOf(this.props.aoStore.member.memberId) !== -1
    )
  }

  render() {
    const card = this.props.aoStore.hashMap.get(this.props.taskId)
    if (!card) {
      console.log('missing card for unread, taskId is', this.props.taskId)
      return null
    }
    if (
      !card.seen ||
      (card.seen &&
        card.seen.some(t => {
          return t.memberId === this.props.aoStore.member.memberId
        }))
    ) {
      return null
    }
    return <div className={'unread'} />
  }
}

export default withUseStore(AoUnread)
