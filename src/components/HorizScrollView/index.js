import React, {Component} from 'react'
import css from './index.scss'

import SwipeShowMore from './SwipeShowMore'

class HorizScrollView extends Component {

  componentDidMount() {
    this.showmore = new SwipeShowMore(this.containor, this.list)
  }
  render() {
    return (
      <div className={css.containor} ref={ref => this.containor = ref}>
        <ul className={css.list} ref={ref => this.list = ref}>
          {
            Array(20).fill('string').map((item, i) => (
              <li key={i} className={css.item}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default HorizScrollView