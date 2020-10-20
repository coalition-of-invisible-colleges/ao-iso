import * as React from 'react'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import api from '../client/api'

interface Props {
  aoStore: AOStore
}

@observer
class AoLightning extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    if (
      !this.props.aoStore.state.cash.info ||
      !this.props.aoStore.state.cash.info.hasOwnProperty('blockheight')
    ) {
      return (
        <React.Fragment>
          <h3>Lightning Status</h3>
          <p>Install clightning to enable crypto features.</p>
          {/*<p>Info: {JSON.stringify(aoStore.state.cash.info)}</p>*/}
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <h3>Lightning Status</h3>
        <p>Lightning detected but lightning module doesn't exist yet.</p>
      </React.Fragment>
    )
  }
}

export default withUseStore(AoLightning)
