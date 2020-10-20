import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { AOStore, withUseStore } from './store'
import AoStack from './stack'
import Sun from '../assets/images/sun.svg'
import AoContextCard from './contextCard'
import api from '../client/api'
import AoPopupPanel from './popup-panel'
import Tippy from '@tippyjs/react'
import { hideAll as hideAllTippys } from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/translucent.css'

interface Props {
  aoStore: AOStore
}

interface State {
  redirect?: string
}

@observer
class AoHub extends React.PureComponent<{}, State> {
  constructor(props) {
    super(props)
    this.state = {}
    this.addCommunityCard = this.addCommunityCard.bind(this)
    this.goHub = this.goHub.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.redirect !== undefined) {
      this.setState({ redirect: undefined })
    }
  }

  addCommunityCard() {
    api.createCard('community hub')
    console.log('community hub card created')
  }

  goHub() {
    event.stopPropagation()
    hideAllTippys()
    this.props.aoStore.closeAllCloseables()

    let card = this.props.aoStore.cardByName.get('community hub')
    if (!card) {
      api.createCard('community hub').then(() => {
        this.goHub()
      })
      return
    }
    const taskId = card.taskId

    if (this.props.aoStore.currentCard === taskId) {
      let redirectCard
      if (this.props.aoStore.context.length <= 0) {
        redirectCard = this.props.aoStore.memberCard.taskId
      } else {
        redirectCard = this.props.aoStore.context[
          this.props.aoStore.context.length - 1
        ]
      }
      this.props.aoStore.setCurrentCard(redirectCard)
      this.props.aoStore.removeFromContext(redirectCard)
      this.setState({
        redirect: redirectCard,
      })
    } else {
      console.log('goInCard taskId is ', taskId)
      this.props.aoStore.addToContext([this.props.aoStore.currentCard])
      this.props.aoStore.setCurrentCard(taskId)
      this.props.aoStore.removeFromContext(taskId)
      this.setState({
        redirect: taskId,
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    let communityCard = this.props.aoStore.cardByName.get('community hub')
    let youAreHere =
      communityCard && this.props.aoStore.currentCard === communityCard.taskId

    return (
      <div id={'hub'}>
        <Tippy
          zIndex={4}
          theme="translucent"
          content={youAreHere ? 'Hide' : 'Community Hub'}
          placement="right">
          <img
            src={Sun}
            onClick={this.goHub}
            className={youAreHere ? 'open' : undefined}
          />
        </Tippy>
      </div>
    )
  }
}

export default withUseStore(AoHub)
