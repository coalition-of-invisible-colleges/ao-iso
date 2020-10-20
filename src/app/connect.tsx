import * as React from 'react'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import api from '../client/api'
import AoServerName from './server-name'
import AoTip from './tip'

interface Props {
  aoStore: AOStore
}

@observer
class AoConnect extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
  }

  render() {
    const list = this.props.aoStore.state.ao.map(ao => <li>{ao}</li>)

    return (
      <React.Fragment>
        <h3>
          Connect AOs{' '}
          <AoTip text="Connect AOs peer-to-peer securely over tor." />
        </h3>
        <div>
          Name this AO: <AoServerName />
        </div>
        <p>Tor status: Offline</p>
        {list.length >= 1 ? (
          <React.Fragment>
            <ul>{list}</ul>
          </React.Fragment>
        ) : (
          <p>No AOs connected.</p>
        )}
      </React.Fragment>
    )
  }
}

export default withUseStore(AoConnect)