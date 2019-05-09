import React, {Component} from 'react'
import css from './index.scss'

class Dialog extends Component {
  render() {
    return (
      <div className={css.dialog}>
        <div className={css.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Dialog