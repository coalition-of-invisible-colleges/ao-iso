import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withUseStore, Task } from './store'
import { HudStyle } from './card-hud'
import path from 'path'

const FileViewer = lazy(() => import('react-file-viewer'))

interface AoAttachmentProps {
  taskId: string
  hudStyle: HudStyle
}

@observer
class AoAttachment extends React.PureComponent<
  AoAttachmentProps
> {
  render() {
    const card = this.props.aoStore.hashMap.get(this.props.taskId)
    if (!card) return null

    let meme = this.props.aoStore.memeById.get(card.taskId)
    if (!meme) {
      return null
    }
    console.log('aoAttachment meme is ', meme)
    // if it's an image, display it
    // otherwise, display a download button
    return (
      <div>
        <Link to={'/meme/' + meme.hash}>Attachment</Link>
        <FileViewer fileType={'jpg'} filePath={'/meme/' + meme.hash} />
      </div>
    )
  }
}

export default withUseStore(AoAttachment)
