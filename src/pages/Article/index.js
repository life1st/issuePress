import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchArticle} from '../../store/action'
import css from './index.scss'

class Article extends Component {
  componentDidMount() {
    // console.log(this.props)
    const {number} = this.props.match.params
    this.props.fetchArticle(number)
  }
  render() {
    const {article} = this.props
    return (
      <div>
        <h2 className={css.title}>{article.title}</h2>
        {
          article.body
        }
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