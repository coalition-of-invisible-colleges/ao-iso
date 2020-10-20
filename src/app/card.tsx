import React from 'react'
import { Helmet } from 'react-helmet'
import { withUseStore } from './store'
import AoDiscardZone from './discard-zone'
import AoContextCard from './context-card'
import AoHud from './hud'

interface CardProps {
  match
}

interface RenderProps {
  taskId: string
}

class RenderCard extends React.Component<RenderProps> {
  constructor(props) {
    super(props)
  }
  render() {
    const aoStore = this.props.aoStore
    const taskId = this.props.taskId
    const card = aoStore.hashMap.get(taskId)
    if (!card) {
      return 'No card specified or card missing.'
    }
    let cardText = ''
    if (card.name === taskId) {
      cardText = aoStore.memberById.get(taskId).name
    } else if (card.guild) {
      cardText = card.guild
    } else {
      cardText = card.name
    }

    if (cardText.length > 12) {
      cardText = cardText.substring(0, 12) + '…'
    }
    return (
      <React.Fragment>
        <Helmet>
          <title>
            {cardText} - {aoStore.state.cash.alias}
          </title>
        </Helmet>
        <AoDiscardZone />
        <AoContextCard task={card} cardStyle={'full'} />
        <AoHud />
      </React.Fragment>
    )
  }
}

class AoCard extends React.Component<CardProps> {
  constructor(props) {
    super(props)
    const aoStore = this.props.aoStore
    const card = aoStore.hashMap.get(this.props.match.params.taskId)
    aoStore.setCurrentCard(this.props.match.params.taskId)
  }

  render() {
    const aoStore = this.props.aoStore
    const RenderCardWithStore = withUseStore(RenderCard)
    return (
      <RenderCardWithStore
        taskId={aoStore.currentCard}
        aoStore={this.props.aoStore}
      />
    )
  }
}

export default withUseStore(AoCard)
