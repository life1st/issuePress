import React, {Component} from 'react'
import css from './index.scss'
import cls from 'classnames'
import {Transition} from 'react-transition-group'
import DropToTarget from './drap2Target'

const toX = (document.body.clientWidth / 3) * 2
const toY = window.screen.availHeight - 30

const DropAvater = ({in: inProp, avatarUrl}) => {
  const transition_config = {
    default_style: {
      opacity: 1,
      top: 0,
      position: 'absolute',
      transform: 'translate(0)',
      transition: 'transform 1000ms linear, opacity 1200ms cubic-bezier(.77,.04,.83,.67)',
    },
    transition_style: {
      exiting: {
        opacity: 0,
        transform: `translateX(${toX}px)`,
        zIndex: 10
      },
      exited: {
        opacity: 0
      }
    },
    y: {
      default_style: {
        transition: 'all 1000ms cubic-bezier(.33,-0.24,.79,.44)'
      },
      exiting: {
        transform: `translateY(${toY}px)`,
      },
      exited: {
        opacity: 0
      }
    }
  }
  console.log({...transition_config.y.exiting})
  return (
    <Transition in={inProp} timeout={1000} enter={false}>
    {
      state => (
        <div className={'x'} style={{
          ...transition_config.default_style,
          ...transition_config.transition_style[state]
        }}>
          <div className={'y'} style={{
            ...transition_config.y.default_style,
            ...transition_config.y[state]
          }}>
            <img src={avatarUrl} alt=""/>
          </div>
        </div>
      )
    }
    </Transition>
  )
}

export default class Child extends Component {
  state = {
    isJoined: false
  }
  static defaultProps = {
    to: null,
    data: null,
    onJoin: () => {}
  }
  componentDidMount() {
  }
  handleJoin = () => {
    if (this.state.isJoined) {
      return 
    }
    this.setState({
      isJoined: true
    })

    this.props.onJoin(this.props.data)
  }

  render() {
    const item = this.props.data
    if (!item) {
      return (<div>Null</div>)
    }

    const {to} = this.props
    const {isJoined} = this.state
    return (
      <div className={css.item}>
        <div className={css.avatar}>
          <img src={item.avatar} alt="" ref={ref => this.avatar = ref}/>
          {to && DropAvater({in: !isJoined, avatarUrl: item.avatar})}
        </div>
        <div className={css.itemText}>
          <p>{item.name}</p>
          <p>{item.member_count}</p>
        </div>
        <div className={css.btnGroup}>
          {
            isJoined ? (
              <button className={cls(css.btn, css.joined)}>已加入</button>
            ) : (
              <button className={cls(css.btn, css.unjoin)} onClick={this.handleJoin}>加入</button>
            )
          }
        </div>
      </div>
    )
  }
}