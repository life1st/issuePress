import React, {Component} from 'react'
import css from './index.scss'

class PlaceHolder extends Component {
  render() {
    const {radius, width, height} = this.props
    return (
      <div
        className={css.placeHolder}
        style={{
          borderRadius: radius,
          width, height
        }}
      />
    )
  }
}

export default PlaceHolder