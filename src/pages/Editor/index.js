import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ToastsStore} from 'react-toasts'
import {isEditing} from '../../utils/url'
import {sendEditArticle, sendNewAritcle} from '../../utils/request/article'
import EasyMde from 'easymde'
import 'easymde/dist/easymde.min.css'
import css from './index.scss'

const mdeConfig = {
  autofocus: true
}

class Editor extends Component {
  state = {
    title: ''
  }
  componentDidMount() {
    this.mde = new EasyMde({
      element: this.textarea,
      ...mdeConfig
    })

    this.isEditing = isEditing(this.props.match.path)

    if (this.isEditing) {
      const content = this.props.article && 
      this.props.article.body
      if (content) {
        this.mde.value(content)
      } else {
        ToastsStore.error('no article data, Re choose it.')
        this.props.history.push('/list')
      }
    }
  }

  render() {
    const {title} = this.state
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
        <textarea ref={ref => this.textarea = ref}></textarea>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

  handleEditTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleSubmit = () => {
    if (this.isEditing) {
      const {number} = this.props.match.params
      sendEditArticle(number, {
        title: this.props.article.title,
        body: this.mde.value()
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
        body: this.mde.value()
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