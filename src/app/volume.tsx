import * as React from 'react'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import api from '../client/api'
import Muted from '../assets/images/muted.svg'
import Unmuted from '../assets/images/unmuted.svg'

interface Props {
  aoStore: aoStore
}

@observer
class AoVolume extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.toggleMute = this.toggleMute.bind(this)
  }

  pendingPromises = []

  toggleMute() {
    if (this.props.aoStore.member.muted) {
      api.unmute()
    } else {
      api.mute()
    }
  }

  render() {
    return (
      <div id={'volume'} onClick={this.toggleMute} className={'action'}>
        <img src={this.props.aoStore.member.muted ? Muted : Unmuted} />
        <span>{this.props.aoStore.member.muted ? 'Unmute' : 'Mute'}</span>
      </div>
    )
  }
}

export default withUseStore(AoVolume)