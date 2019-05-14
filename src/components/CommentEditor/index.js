import React, {Component} from 'react'
import MdEditor from '../MdEditor'
import css from './index.scss'
import PropsTypes from 'prop-types'
import {ToastsStore} from 'react-toasts'
import {sendComment} from '../../utils/request/article'

class CommentEditor extends Component {
  static PropTypes = {
    issueNumber: PropsTypes.number.isRequired
  }

  render() {
    return (
      <div className={css.commentEditor}>
        <MdEditor onSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleSubmit = (content) => {
    sendComment(content)
  }
}

export default CommentEditor