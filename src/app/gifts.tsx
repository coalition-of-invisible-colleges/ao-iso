import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import AoStack from './stack'
import AoPopupPanel from './popup-panel'
import Gift from '../assets/images/gifts.svg'

interface Props {
  aoStore: AOStore
}

@observer
class AoGifts extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
  }

  @computed get myGifts() {
    return this.props.aoStore.state.tasks.filter(task => {
      return task.passed.some(pass => pass[1] === this.props.aoStore.member.memberId)
    })
  }

  @computed get renderGiftsList() {
    if (this.myGifts.length < 1) {
      return ''
    }

    return (
      <div className="results">
        <AoStack
          cards={this.myGifts}
          zone="gifts"
          cardStyle="face"
          alwaysShowAll={true}
        />
      </div>
    )
  }

  render() {
    if (this.myGifts.length < 1) {
      return null
    }
    const renderedBadge = <React.Fragment>{this.myGifts.length}</React.Fragment>

    return (
      <div id="gifts">
        <AoPopupPanel
          iconSrc={Gift}
          tooltipText="Gifts"
          badge={renderedBadge}
          tooltipPlacement="right"
          panelPlacement="right">
          <React.Fragment>
            <h2>Gifts</h2>
            <div
              style={{
                textAlign: 'center',
                position: 'relative',
                top: '-0.5em'
              }}>
              <small>Cards passed to you</small>
            </div>
            {this.renderGiftsList}
          </React.Fragment>
        </AoPopupPanel>
      </div>
    )
  }
}

export default withUseStore(AoGifts)