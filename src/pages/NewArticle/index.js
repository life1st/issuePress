import React, {Component} from 'react'

import css from './index.scss'
class NewArticle extends Component {
  render() {
    return (
      <div>
        <h2>New</h2>
        <textarea name="" id="" cols="30" rows="10"></textarea>
        <button>Submit</button>
      </div>
    )
  }
}

export default NewArticle