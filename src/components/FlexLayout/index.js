import React, {Component} from 'react'
import css from './index.scss'
import cls from 'classnames'
import Tappable from 'react-tappable'
export default class FlexLayout extends Component {
  render() {
    const [index, avatar, showJoinAnimate, showGroupDesc, member_count, member_name, showJoinBtn, uri] = [
      1,
      'https://img3.doubanio.com/icon/g56905-1.jpg',
      false,
      false,
      100000,
      'xiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabixiaoshabi',
      false,
      ''
    ]
    return (
      <div className={cls(css.introItem, css['lg'], css['explore'])}>
        {
          index && (<span className={cls(css.index, index <= 3  && css.topIndex)}>{index}</span>)
        }
        <Tappable
          className={css.avatar}
          activeDelay={80}
          moveThreshold={1}
          component={'span'}
          onClick={this.handleEnterGroup}
        >
          <img src={avatar} alt="group avatar" />
          {showJoinAnimate && DropAvatar({in: !isJoined, avatarUrl: avatar})}
        </Tappable>
        <Tappable 
          className={css.info}
          activeDelay={80}
          moveThreshold={1}
          component={'span'}
          onClick={this.handleEnterGroup}
        >
          <p className={css.name}>{name}</p>
          {
            showGroupDesc && (
              <p className={css.desc}>{desc_abstract}</p>
            )
          }
          <p className={css.desc}>
            <span>{(member_count)}</span>个<span>{member_name}</span>
          </p>
        </Tappable>
        <div className={css.btnGroup}>
        {
          showJoinBtn ? (
            isJoined 
            ? <button className={cls(css.joined, css.btn)}>{JOIN_TEXT[member_role] || '已加入'}</button>
            : <button className={cls(css.join, css.btn)} onClick={this.handleJoinClick}>{config[from].joinText}</button>
          ) : (
            <Tappable 
              className={cls(css.join, css.btn)}
              activeDelay={80}
              moveThreshold={0}
              component={'a'}
              href={uri}
            >申请加入</Tappable>
          )
        }
        </div>
      </div>
    )
  }
}