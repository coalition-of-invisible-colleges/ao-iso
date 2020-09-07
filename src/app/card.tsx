import React from 'react';
import { Helmet } from 'react-helmet';
import store from './store';
import AoDiscardZone from './discard-zone';

interface CardProps {
  match;
}

interface RenderProps {
  taskId: string;
}

class RenderCard extends React.Component<RenderProps> {
  constructor(props) {
    super(props)
  }
  render() {
    const aoStore = store.store;
    const taskId = this.props.taskId
    const card = aoStore.hashMap.get(taskId)
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
        {/* <AoContextCard task={card} cardStyle={'full'} />
        <AoHud /> */}
      </React.Fragment>
    );
  }
}

export default class AoCard extends React.Component<CardProps> {
  constructor(props) {
    super(props);
    const aoStore = store.store;
    const card = aoStore.hashMap.get(this.props.match.params.taskId);
    aoStore.setCurrentCard(this.props.match.params.taskId);
  }

  render() {
    const aoStore = store.store;
    return <RenderCard taskId={aoStore.currentCard} />
  }
}
