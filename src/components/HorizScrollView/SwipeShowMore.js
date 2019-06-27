const INIT_EVENT_CONFIG = {
  can_start: false, 
  success: false, // 触发成功回调
  effective_distance: {
    x: 50,
  },
  touch: {
    x: null
  }
}
class SwipeShowMore {
  // containor.clientWidth + containor.scrollLeft = list.clientWidth
  constructor(containor, list, config) {
    this.containor_config = {
      el: containor,
      width: containor.clientWidth
    }
    this.list_config = {
      el: list,
      width: list.clientWidth
    }

    this.callback = {
      onSuccess: config && config.onSuccess
    }

    this.event_config = {
      ...INIT_EVENT_CONFIG
    }

    this._initCircleDom()

    containor.onscroll = (e) => {
      const scrollLeft = e.target.scrollLeft
      // buffer 10px
      if (this.containor_config.width + scrollLeft >= this.list_config.width - 10) {
        this.event_config.can_start = true
      } else {
        this.event_config.can_start = false
      }
    }

    containor.addEventListener('touchstart', this._handleTouchStart)
    containor.addEventListener('touchmove', this._handleTouchMove)
    containor.addEventListener('touchend', this._handleTouchEnd)
  }

  claer() {
    // call this when dom destory.
    this.containor_config.el.removeEventListener('touchstart', this._handleTouchStart)
    this.containor_config.el.removeEventListener('touchmove', this._handleTouchMove)
    this.containor_config.el.removeEventListener('touchend', this._handleTouchEnd)
  }

  _handleTouchStart = (e) => {
    // console.log(e)
  }

  _handleTouchMove = (e) => {
    if (this.event_config.can_start) {
      const touch = e.targetTouches[0]
      this._initStartX(touch)
      const {pageX: x, pageY: y} = touch
      const xDiff = x - this.event_config.touch.x
      this._setDom(xDiff)
      if (xDiff < 0) {
        e.preventDefault()
      }
    }
  }

  _handleTouchEnd = (e) => {
    // clear last event status store on the class.

    if (this.event_config.success) {
      this.callback.onSuccess && this.callback.onSuccess()
    }

    this.event_config = {
      ...INIT_EVENT_CONFIG,
      can_start: true //这个值不需要清，会在 onscroll 中处理
    }
    this.textEl.innerText = '全部小组'
    this.textEl.style.opacity = '0'
    this.circleEl.style.width = `0`
    this.circleEl.style.transition = `all 300ms`
    setTimeout(() => {
      this.circleEl.style.transition = ``      
    }, 300);

  }

  _initStartX = (touch) => {
    const {pageX: x, pageY: y} = touch
    if (!this.event_config.touch.x) {
      this.event_config.touch.x = x
    }
  }

  _initCircleDom = () => {
    const circleEl = document.createElement('div')
    const textEl = document.createElement('p')
    textEl.innerText = '全部小组'
    
    textEl.style.cssText = `
      width: 1em;
      position: absolute;
      top: 50%;
      right: 2px;
      margin: 0;
      transform: translateY(-50%);
      font-size: 12px;
      line-height: 12px;
      color: #8c8c8c;
      opacity: 0;
    `
    circleEl.style.cssText = `
      position: absolute;
      text-align: right;
      right: 0;
      top: 0;
      width: 0;
      border-radius: 100px 0 0 100px;
      height: 100%;
      background-color: #eee;
      transition: transform 300ms;
    `

    this.circleEl = circleEl
    this.textEl = textEl
    this.circleEl.appendChild(textEl)
    this.list_config.el.appendChild(circleEl)
  }
  
  _setDom = (xDiff) => {
    const BASE = this.containor_config.width / 2
    const abs_w = Math.abs(xDiff)
    if (abs_w < BASE && abs_w < 80) {
      
      if (-xDiff > 72) {
        this.event_config.success = true
        this.textEl.innerText = '释放查看全部'
      } else {
        this.event_config.success = false
        this.textEl.innerText = '全部小组'
      }
      
      this.textEl.style.opacity = '1'
      this.circleEl.style.width = `${(-xDiff / 2)}px`
      this.circleEl.style.borderRadius = `${abs_w / 2}px 0 0 ${abs_w / 2}px`
    }
  }
}

export default SwipeShowMore