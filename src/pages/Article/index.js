import React, {Component} from 'react'
import css from './index.scss'

class Article extends Component {
  render() {
    return (
      <div>
        <h2 className={css.title}>Title</h2>
        <p>Deserunt dolore enim sint duis in mollit cupidatat commodo. Occaecat labore mollit eu duis nulla qui commodo pariatur eu eiusmod veniam velit. Deserunt et exercitation adipisicing duis do incididunt sint in dolore aute officia reprehenderit veniam pariatur.</p>
      </div>
    )
  }
}

export default Article