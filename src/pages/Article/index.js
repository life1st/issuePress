import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchArticle} from '../../store/action'
import {changeDocTitle} from '../../utils/doc'
import css from './index.scss'

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt()

class Article extends Component {
  componentDidMount() {
    const {number} = this.props.match.params
    this.props.fetchArticle(number)
  }
  componentWillUnmount() {
    changeDocTitle('')
  }
  render() {
    const {article} = this.props
    changeDocTitle(article.title)
    return (
      <div>
        <h2 className={css.title}>{article.title}</h2>
        <div dangerouslySetInnerHTML={{__html: article.body ? md.render(article.body) : ''}} />
      </div>
    )
  }
}

const mapState2Props = ({article}) => ({
  article: article.article
})
export default withRouter(
  connect(
    mapState2Props,
    {
      fetchArticle
    }
  )(Article)
)