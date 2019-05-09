import React, {Component} from 'react'
import css from './index.scss'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {fetchArticleList} from '../../store/action'
import Labels from '../../components/Labels'

class ArticleList extends Component {
  componentDidMount() {
    if (this.props.list.length <= 0) {
      this.props.fetchArticleList()
    }
  }
  render() {
    const {list, activeLabels} = this.props
    const showAbleList = list.filter(item => {
      return item.labels.some(label => activeLabels.includes(label.id))
    })
    return (
      <div className={css.articleList}>
        <Labels />
        <div className={css.article}>
          <h2>List</h2>
          <ul className={css.list}>
            {
              showAbleList.map(item => (
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
  activeLabels: article.activeLabels
})

export default withRouter(
  connect(
    mapState2Props,
    {
      fetchArticleList
    }
  )(ArticleList)
)