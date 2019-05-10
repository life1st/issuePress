import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ToastsStore} from 'react-toasts'
import {isEditing} from '../../utils/url'
import {sendEditArticle, sendNewAritcle} from '../../utils/request/article'
import css from './index.scss'
import MdEditor from '../../components/MdEditor'

class Editor extends Component {
  static defaultProps = {
    article: {}
  }
  state = {
    title: '',
    content: ''
  }
  componentDidMount() {
    this.isEditing = isEditing(this.props.match.path)

    if (this.isEditing) {
      const {body: content, title} = this.props.article
      
      if (content) {
        this.setState({
          content,
          title
        })
      } else {
        ToastsStore.error('no article data, Re choose it.')
        this.props.history.push('/list')
      }
    }
  }

  render() {
    const {title, content} = this.state
    return (
      <div>
        <div className={css.title}>
          <h1>{title}</h1>
          <input 
            className={css.titleVal}
            type="text" 
            value={title} 
            onChange={(e) => this.handleEditTitle(e)} 
          />
        </div>
        <MdEditor content={content} onSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleEditTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = (content) => {
    if (this.isEditing) {
      const {number} = this.props.match.params
      sendEditArticle(number, {
        title: this.state.title,
        body: content
      }).then(res => {
        ToastsStore.success('Already updated.')
        this.props.history.push('/list')
      }).catch(() => {
        ToastsStore.error('bed network.')
      })
    } else {
      const {title} = this.state
      sendNewAritcle({
        title,
        body: content
      }).then(res => {
        ToastsStore.success('New Article Already Posted.')
        this.props.history.push('/list')
      }).catch(() => {
        ToastsStore.error('submit error.')
      })
    }
    
  }
}

const mapState2Props = ({article}) => ({
  article: article.article
})
export default withRouter(
  connect(
    mapState2Props
  )(Editor)
)