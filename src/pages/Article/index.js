import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchArticle} from '../../store/action'
import {changeDocTitle} from '../../utils/doc'
import css from './index.scss'
import hljs from 'highlight.js/lib/highlight'
import 'highlight.js/styles/github.css'

const MarkdownIt = require('markdown-it')
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

class Article extends Component {
  componentDidMount() {
    const {number} = this.props.match.params
    !!number && this.props.fetchArticle(number)
    this.prevDocTitle = document.title
  }
  componentWillUnmount() {
    changeDocTitle(this.prevDocTitle || '')
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