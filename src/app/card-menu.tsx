import React, { lazy } from 'react'
import { computed } from 'mobx'
import { observer } from 'mobx-react'
import AoCardHud, { HudStyle } from './card-hud'
import LazyTippy from './lazy-tippy'
import 'tippy.js/dist/tippy.css'

interface CardMenuProps {
  taskId: string
  hudStyle: HudStyle
  noPopups?: boolean
}

@observer
export default class CardMenu extends React.PureComponent<CardMenuProps> {
  @computed
  get renderMenuButton() {
    return (
      <div
        className={'cardMenuButton'}
        onDoubleClick={event => {
          event.stopPropagation()
          event.nativeEvent.stopImmediatePropagation()
        }}>
        &#x22EE;
      </div>
    )
  }

  render() {
    if (this.props.noPopups) {
      return this.renderMenuButton
    }

    if (typeof document == 'undefined') {
      return this.renderMenuButton;
    } else {
      return (
        <LazyTippy
          zIndex={5}
          content={<AoCardHud taskId={this.props.taskId} hudStyle={'menu'} />}
          interactive={true}
          trigger={'click'}
          placement={'top-end'}
          appendTo={document.getElementById('root')}>
          {this.renderMenuButton}
        </LazyTippy>
      )
    }
  }
}
