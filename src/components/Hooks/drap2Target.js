class DropToTarget {
  constructor() {
    this.target = {
      x: document.body.clientWidth / 2,
      y: window.screen.availHeight - 10
    }
  }

  init(el) {
    this.el = el
    const start = {x: el.x, y: el.y} 
    const numb = 30
    this.speed = {
      x: (this.target.x - start.x) / numb,
      y: 0
    }

    this.work(start)
  }

  work({x, y}) {
    const s = 10
    this.el.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
    `
    if (x < this.target.x) {
      x += this.speed.x
    }
    if (y < this.target.y) {
      y += this.speed.y
      this.speed.y += 9
    }
    console.log(x, y, this.target.y)
    
    if (x < this.target.x || y < this.target.y) {
      window.requestAnimationFrame(() => {
        this.work({x, y})
      })
    } else {
      this.el.remove()
    }
  }
}

export default DropToTarget