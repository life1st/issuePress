import css from './index.scss'
import cls from 'classnames'
import React, {Component} from 'react'
import {data} from './utils'

// import MenuIcon from './menu.png'
const itemHeight = 39 //px
export default class DndList extends Component {
  state = {
    data: [],
    dragItem: null,
    dragItemY: null
  }
  componentDidMount() {
    this.setState({
      data
    })
    this.baseTop = this.containor.offsetTop
    window.oncontextmenu = () => false
  }
  handleTouchStart = (item) => {
    
    setTimeout(() => {
      // navigator.vibrate && navigator.vibrate(100)
      this.setState({
        dragItem: item,
        dragItemY: this[item.name].offsetTop + this.baseTop
      })
    }, 200);
  }
  handleTouchMove = (e) => {
    e.preventDefault()
    const touches = e.targetTouches
    const startIndex = this.state.data.indexOf(this.state.dragItem)
    if (touches[0]) {
      const dragItemY = touches[0].pageY - this.baseTop
      const nowIndex = Math.floor(dragItemY / itemHeight)
      const tempData = [...this.state.data]
      console.log(startIndex, nowIndex, dragItemY)
      if ((startIndex !== -1) 
      && (nowIndex !== -1)
      && (nowIndex < tempData.length) 
      && nowIndex !== startIndex) {
        [tempData[startIndex], tempData[nowIndex]] = [tempData[nowIndex], tempData[startIndex]]
        this.setState({
          data: tempData
        })
      }
      this.setState({
        dragItemY, 
      })
    }
  }
  handleTouchEnd = (e) => {
    this.setState({
      dragItem: null
    })
  }
  render () {
    const {dragItem, dragItemY, data} = this.state
    return (
      <div>
        <ul 
          className={cls(css.sortableList, dragItem && css.listOnDraging)} 
          ref={ref => this.containor = ref} 
          onTouchMove={this.handleTouchMove} 
          onTouchEnd={this.handleTouchEnd}
        >
          {
            data.map(item => (
              <li 
                className={cls(css.sortableItem, (dragItem && dragItem.name === item.name) && css.onDrag)}
                key={item.name}
                ref={ref => this[item.name] = ref}
              >
                <span>{item.name}</span>
                <i className={cls(css.icon, css.menu)} onTouchStart={(e) => {this.handleTouchStart(item)}} />
              </li>
            ))
          }
        </ul>
        {
          <li 
            className={cls(css.sortableItem, css.dragItem)} 
            ref={ref => this.dragItem = ref}
            style={{
              display: !dragItem && 'none',
              top: dragItemY
            }}
          >
            <span>{dragItem && dragItem.name}</span>
            <i className={cls(css.icon, css.menu)} />
          </li>
        }
      </div>
    )
  }
}