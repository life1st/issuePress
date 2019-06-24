const INIT_EVENT_CONFIG = {
  can_start: false, 
  effective_distance: {
    x: 50,
  },
  touch: {
    x: null
  }
}
class SwipeShowMore {
  // containor.clientWidth + containor.scrollLeft = list.clientWidth
  constructor(containor, list) {
    this.containor_config = {
      el: containor,
      width: containor.clientWidth
    }
    this.list_config = {
      el: list,
      width: list.clientWidth
    }

    this.event_config = {
      ...INIT_EVENT_CONFIG
    }

    this._initCircleDom()

    containor.onscroll = (e) => {
      const scrollLeft = e.target.scrollLeft
      // buffer 10px
      if (this.containor_config.width + scrollLeft >= this.list_config.width - 10) {
        console.log('can_start')
        this.event_config.can_start = true
      } else {
        console.log('can not')
        this.event_config.can_start = false
      }
    }

    containor.addEventListener('touchstart', this._handleTouchStart)
    containor.addEventListener('touchmove', this._handleTouchMove)
    containor.addEventListener('touchend', this._handleTouchEnd)
  }

  claer() {
    // call this when dom destory.
    containor.removeEventListener('touchstart', this.handleTouchStart)
    containor.removeEventListener('touchmove', this.handleTouchMove)
  }

  _handleTouchStart = (e) => {
    console.log(e)
  }

  _handleTouchMove = (e) => {
    if (this.event_config.can_start) {
      const touch = e.targetTouches[0]
      this._initStartX(touch)
      const {pageX: x, pageY: y} = touch
      const xDiff = x - this.event_config.touch.x
      this._setDom(xDiff)
    }
  }

  _handleTouchEnd = (e) => {
    // clear last event status store on the class.

    this.event_config = {
      ...INIT_EVENT_CONFIG,
      can_start: true //这个值不需要清，会在 onscroll 中处理
    }
    console.log('end')
    this.circleEl.style.transform = 'translateX(100%);'
    // this.textEl.style.transform = 'translateX(100%) translateY(50%);'
  }

  _initStartX = (touch) => {
    const {pageX: x, pageY: y} = touch
    if (!this.event_config.touch.x) {
      this.event_config.touch.x = x
    }
  }

  _initCircleDom = () => {
    const initTransformX = 'translateX(100%)'

    const circleEl = document.createElement('div')
    const textEl = document.createElement('p')
    textEl.innerText = '左划查看更多'
    
    // textEl.style.cssText = `
    //   width: 1em;
    //   position: absolute;
    //   top: 50%;
    //   right: 0;
    //   transform: translateY(-50%) ${initTransformX};
    //   font-size: 12px;
    //   color: #fff;
    // `
    circleEl.style.cssText = `
      position: absolute;
      text-align: right;
      right: 0;
      top: 0;
      width: 1.2em;
      border-radius: 50% 0 0 50%;
      height: 100%;
      background-color: rgba(0, 0, 0, .4);
      transform: ${initTransformX};
      transition: transform 300ms;
    `

    this.circleEl = circleEl
    // this.textEl = textEl
    this.list_config.el.appendChild(circleEl)
    // this.list_config.el.appendChild(textEl)
  }
  
  _setDom = (xDiff) => {
    const BASE = this.containor_config.width / 2
    if (xDiff < BASE) {
      
      let scale = (Math.abs(xDiff) / BASE) + 1
      // if (scale < 2) {
      //   scale *= 1.2
      // } 
      // if (scale > 3) {
      //   scale *= 0.8
      // }
      
      let translateX
      if (scale < 2.8) {
        translateX = (100 / 0.8) * (scale - 1)
      } else {
        // translateX = 100
      }
      console.log(translateX)
      this.circleEl.style.transform = `scale(${scale}, 1) translateX(${translateX - 100}%)`
      // this.textEl.style.transform = `translateX(${translateX - 100}) translateY(50%)`
    }
  }
}

export default SwipeShowMore