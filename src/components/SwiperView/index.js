import React, {Component} from 'react'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import PropTypes from 'prop-types'
import css from './index.scss'

const group = {
  avatar: 'https://img3.doubanio.com/view/group/sqxs/public/1c0a5162bddf475.webp',
  name: '杠起整个地球',
  number: 23456,
  memberDesc: '杠杆',
}

export default class SwiperView extends Component {
  state = {
    groups: Array(3).fill(group)
  }

  componentDidMount() {
    setTimeout(() => {
      this.swiper1 = new Swiper('.swiper-containor', {
        slidesPerView: 'auto',
        spaceBetween: 15,
        autoplay: 3000,
        loop: true,
        // autoplay: false,
        autoplayDisableOnInteraction: false
      })
    }, 300);
  }
  render() {
    return (
      <div>
        <div className="swiper-containor">
          <div className="swiper-wrapper">
          {
            Array(4).fill(0).map((None, i) => (
              <div className="swiper-slide" key={i}>
                <GroupList data={Array(3).fill(group)} />
              </div>
            ))
          }
          </div>
        </div>
      </div>
    )
  }
}

class GroupList extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      avatar: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.number,
      memberDesc: PropTypes.string
    }))
  }
  render() {
    const {data: groups} = this.props
    return (
      <div>
        {
          groups.map((group, i) => (
            <div key={i} className={css.introItem}>
              <div className={css.avatar}>
                <img src={group.avatar} alt="group avatar"/>
              </div>
              <div className={css.info}>
                <p className={css.name}>{group.name}</p>
                <p className={css.desc}>
                  <span>{group.number}</span>个<span>{group.memberDesc}</span>
                </p>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
