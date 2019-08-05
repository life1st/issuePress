import React, {Component} from 'react'
import Tappable from 'react-tappable'
import Swiper from 'swiper';
import cls from 'classnames'
import css from './index.scss'
import 'swiper/dist/css/swiper.min.css'

const default_data = {
  name: 'name',
  author: 'author',
  comment_count: 20
}
export default class TapList extends Component {

  componentDidMount() {
    this.swiper = new Swiper('.swiper-containor', {
      pagination: '.swiper-pagination',
      slidesPerView: 'auto',
      spaceBetween: 15,
    })
  }
  handleTap = () => {
    console.log('taped', Date.now())
  }
  render() {
    return (
      <div className='swiper-containor'>
        <div className="swiper-wrapper">
        {
          Array(5).fill(0).map((_unused, i) => {
            return (
              <ul className={cls(css.list, 'swiper-slide')} key={i}>
                {
                  Array(6).fill({...default_data}).map((item, i) => {
                    return (
                      <li className={cls(css.item)} key={i}>
                        <div className={css.avatar}></div>
                        <Tappable 
                          onClick={this.handleTap}
                          className={css.info}
                          // onTap={this.handleTap}
                          // moveThreshold={5}
                          >
                          <p>{item.name}</p>
                          <p>{item.author}</p>
                        </Tappable>
                      </li>
                    )
                  })
                }
              </ul>
            )
          })
        }
        </div>
        <div className="swiper-pagination" />
      </div>
    )
  }
}
