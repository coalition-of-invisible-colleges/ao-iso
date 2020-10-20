import * as React from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import api from '../client/api'
import AoPopupPanel from './popup-panel'
import Pepe from '../assets/images/pepe.svg'
import AoStack from './stack'

interface Props {
  aoStore: AOStore
}

interface State {
  page: number
}

export const defaultState: State = {
  page: 0
}

@observer
class AoShitposts extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.purgeUnheldCards = this.purgeUnheldCards.bind(this)
  }

  purgeUnheldCards() {
    api.removeCards(this.props.aoStore.allUnheldCards.map(task => task.taskId))
  }

  render() {
    if (this.props.aoStore.allUnheldCards.length < 1) {
      return null
    }

    const renderedBadge = this.props.aoStore.allUnheldCards.length.toString()

    // console.log('unheldcards is', this.allUnheldCards)
    return (
      <div id={'shitposts'}>
        <AoPopupPanel
          iconSrc={Pepe}
          tooltipText={'Shitposts'}
          badge={renderedBadge}
          tooltipPlacement={'left'}
          panelPlacement={'left'}>
          <button onClick={this.purgeUnheldCards}>Purge Unheld Cards</button>
          <AoStack
            cards={this.props.aoStore.allUnheldCards}
            cardStyle={'priority'}
            alwaysShowAll={true}
          />
        </AoPopupPanel>
      </div>
    )
  }
}

export default withUseStore(AoShitposts)