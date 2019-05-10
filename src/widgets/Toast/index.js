import ReactDOM from 'react-dom'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import css from './index.scss'
// todo.
class ToastComp extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['top-right', 'bottom-right'])
  }

  render() {
    const {text, type, position} = this.props
    return (
      <div 
        ref={ref => this.el = ref} 
        className={`${css.dialog} ${css[position]}`}
      >
        <p>{text}</p>
      </div>
    )
  }
}

class Toast {
  constructor() {
    const domWrap = document.createElement('div')
    document.body.appendChild(domWrap)
    
    ReactDOM.render(<ToastComp text={text} position={position} />, domWrap)
  }

  render() {
  }
}

export default new Toast