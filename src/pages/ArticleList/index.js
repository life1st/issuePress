import React, {Component} from 'react'
import css from './index.scss'
import {connect} from 'react-redux';
import {fetchArticleList} from '../../store/action'

class ArticleList extends Component {
  state = {
    showingList: null
  }

  componentDidMount() {
    this.props.fetchArticleList()
  }
  render() {
    const {labels: types} = this.props
    return (
      <div className={css.articleList}>
        <div className={css.type}>

        </div>
        <div className={css.list}>
        
        </div>
      </div>
    )
  }
}

const mapState2Props = ({article}) => ({

})

export default connect(
  mapState2Props,
  {
    fetchArticleList
  }
)(ArticleList)