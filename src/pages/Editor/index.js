import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {ToastsStore} from 'react-toasts'
import {isEditing} from '../../utils/url'
import {sendEditArticle, sendNewAritcle} from '../../utils/request/article'
import css from './index.scss'
import MdEditor from '../../components/MdEditor'
import LabelEditor from '../../components/LabelEditor'

class Editor extends Component {
  static defaultProps = {
    article: {}
  }
  state = {
    title: '',
    content: '',
    isEncryption: false
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
    const {title, content, isEncryption} = this.state
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
        <input 
          type="checkbox" 
          id="is_encryption" 
          value={isEncryption} 
          onChange={() => {
            this.setState({isEncryption: !isEncryption})
          }}/>
        <label htmlFor="is_encryption">Encryption</label>
        <MdEditor content={content} onChange={this.handleMdeChange} />
        <LabelEditor isEncryption={isEncryption} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    )
  }

  handleMdeChange = (val) => {
    this.mdeContent = val
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
        title: this.state.title,
        body: this.mdeContent
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
        body: this.mdeContent
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