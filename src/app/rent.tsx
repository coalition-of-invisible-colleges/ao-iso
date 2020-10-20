import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import api from '../client/api'
import AoTip from './tip'

interface Props {
  aoStore: AOStore
}

@observer
class AoRent extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
    this.renderPendingDeactivation = this.renderPendingDeactivation.bind(this)
  }

  @computed get activeMembers() {
    let a = 0
    this.props.aoStore.state.members.forEach(m => {
      if (m.active > 0) {
        a++
      }
    })
    return a
  }

  @computed get perMember() {
    return this.props.aoStore.state.cash.rent / this.activeMembers
  }

  @computed get pendingDeactivations() {
    return this.props.aoStore.state.members
      .filter(
        m =>
          m.active > 0 && this.props.aoStore.hashMap.get(m.memberId).boost <= 0
      )
      .map(m => m.memberId)
  }

  renderPendingDeactivation() {
    if (
      this.pendingDeactivations.length <= 0 ||
      this.props.aoStore.state.cash.rent <= 0
    ) {
      return <p>No users are pending deactivation</p>
    }

    const renderedDeactivations = this.pendingDeactivations.map(mId => (
      <li>{mId}</li>
    )) // should be name

    return (
      <React.Fragment>
        <h4>Pending Deactivation:</h4>
        <ul>{renderedDeactivations}</ul>
      </React.Fragment>
    )
  }

  render() {
    const monthlyCost = this.props.aoStore.state.cash.rent
    const monthlyCap = this.props.aoStore.state.cash.cap

    return (
      <React.Fragment>
        <h3>
          Rent Split{' '}
          <AoTip text="Each month the node cost is split between accounts." />
        </h3>
        <p>Monthly cost: {monthlyCost} [set]</p>
        <p>Monthly cap: {monthlyCap} max [set]</p>
        <p>Active members: {this.activeMembers}</p>
        {this.activeMembers >= 1 ? (
          <p>= {this.perMember} each</p>
        ) : (
          'No active members to charge a monthly membership fee.'
        )}
        {this.renderPendingDeactivation()}
      </React.Fragment>
    )
  }
}

export default withUseStore(AoRent)
