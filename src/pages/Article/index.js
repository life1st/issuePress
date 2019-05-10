import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchArticle} from '../../store/action'
import {loginUserIsAdmin} from '../../store/helper'
import {changeDocTitle} from '../../utils/doc'
import PlaceHolder from '../../components/PlaceHolder'
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
      } catch (e) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
})

const Fetching = () => (
  <div className={css.article}>
    <PlaceHolder width={80} height={24} />
    <div style={{marginTop: 12}}>
      {Array(12).fill(0).map((width, index) => (
        <pre key={index}>
          <PlaceHolder 
            width={Math.floor(Math.random() * 600 + 10)} 
            height={12}
          />
          <p style={{height: 4}}></p>
        </pre>
      ))}
    </div>
  </div>
)

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
    const {article, isAdmin} = this.props
    changeDocTitle(article.title)
    return article.title ? (
      <div className={css.article}>
        <div className={css.opreation}>
          {
            isAdmin && (<button onClick={this.handleEdit}>Edit</button>)
          }
        </div>
        <h2 className={css.title}>{article.title}</h2>
        <div dangerouslySetInnerHTML={{__html: article.body ? md.render(article.body) : ''}} />
      </div>
    ) : <Fetching />
  }

  handleEdit = () => {
    this.props.history.push('/edit/' + this.props.match.params.number)
  }
}

const mapState2Props = ({article, user}) => ({
  article: article.article, 
  isAdmin: loginUserIsAdmin({user})
})
export default withRouter(
  connect(
    mapState2Props,
    {
      fetchArticle,
    }
  )(Article)
)