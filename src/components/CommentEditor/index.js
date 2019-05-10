import React, {Component} from 'react'
import MdEditor from '../MdEditor'
import css from './index.scss'

class CommentEditor extends Component {
  render() {
    return (
      <div className={css.commentEditor}>
        <MdEditor onSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleSubmit = (content) => {
    
  }
}

export default CommentEditor