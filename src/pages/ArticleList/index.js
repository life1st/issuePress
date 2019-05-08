import React, {Component} from 'react'
import css from './index.scss'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchArticleList} from '../../store/action'

class ArticleList extends Component {
  state = {
    showingList: null
  }

  componentDidMount() {
    if (this.props.list.length <= 0) {
      this.props.fetchArticleList()
    }
  }
  render() {
    const {labels, list} = this.props
    return (
      <div className={css.articleList}>
        <div className={css.labels}>
          <h2>Types</h2>
          <ul className={css.labelList}>
            {
              Object.keys(labels).map(key => (
                <li 
                  key={key} 
                  className={css.label}
                >
                  <p style={{
                    backgroundColor: `#${labels[key].color}`
                  }}>{labels[key].name}</p>
                </li>
              ))
            }
          </ul>
        </div>
        <div className={css.article}>
          <h2>List</h2>
          <ul className={css.list}>
            {
              list.map(item => (
                <li 
                  className={css.item} 
                  key={item.id}
                  onClick={() => {this.handleArticleClick(item)}}
                >
                  {item.title}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }

  handleArticleClick = (item) => {
    this.props.history.push(`/article/${item.number}`)
  }
}

const mapState2Props = ({article}) => ({
  list: article.list,
  labels: article.labels
})

export default withRouter(
  connect(
    mapState2Props,
    {
      fetchArticleList
    }
  )(ArticleList)
)